import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
// import { MailService } from 'src/mail/mail.service'
import { User } from 'src/schemas/user.entity'
import { Repository } from 'typeorm'
import { compare } from 'bcrypt'
import { FullMessageDto, JwtGetUserDto, LoginResDto, RegisterResDto, ResMessageDto } from './interface/response.dto'
import { confirmPasswordDto, RegisterLocalDto } from './interface/request.dto'
import { Profile } from 'passport-spotify'
import { randomUUID } from 'crypto'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService, // private readonly mailService: MailService,
    private readonly httpService: HttpService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where({ email })
      .addSelect('user.password')
      .getOne()
    if (user && user.status !== 'active')
      throw new ForbiddenException('User does not active!, Please verify your email or contact the support team')

    if (user && (await compare(pass, user.password))) {
      const { password, ...rest } = user
      return rest
    }

    return null
  }

  login(user: User): LoginResDto {
    const { id, ...rest } = user
    const payload = { sub: id }

    return {
      message: 'Login success',
      data: {
        user,
        accessToken: this.jwtService.sign(payload),
      },
    }
  }

  async getOne(id): Promise<JwtGetUserDto> {
    const data = await this.userRepository.findOne({ where: { id } })
    if (!data) throw new NotFoundException('User does not exists')
    return { message: 'Is a user', data }
  }

  async createOne(user: RegisterLocalDto): Promise<RegisterResDto> {
    const duplicate = await this.userRepository.findOne({
      where: { email: user.email },
    })
    if (duplicate) throw new BadRequestException('This email is already in the system.')

    const newUser = await this.userRepository.create({
      email: user.email,
      password: user.password,
    })
    const isUser = await this.userRepository.save(newUser)
    const { id, ...rest } = isUser
    const payload = { id: id }
    // await this.mailService.sendUserVerifyMail(user.email, this.jwtService.sign(payload))

    return {
      message: 'Register success please verify your email',
      data: {
        status: 'success',
      },
    }
  }

  async approveMail(token: string): Promise<ResMessageDto> {
    const user = this.jwtService.decode(token) as { id: number }
    if (!user.id) throw new NotFoundException('User does not exists')
    await this.userRepository.update(
      { id: user.id },
      {
        status: 'active',
      },
    )
    return {
      message: 'success',
    }
  }

  async forgotPassword(email: string): Promise<FullMessageDto> {
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) throw new NotFoundException('User does not exists')
    const payload = { id: user.id }
    // await this.mailService.sendUserForgotPassWordMail(user.email, this.jwtService.sign(payload))
    return {
      message: 'Success please check your email',
      status: 200,
    }
  }

  async updatePassword(token: string, body: confirmPasswordDto): Promise<FullMessageDto> {
    const { id } = this.jwtService.decode(token) as { id: number }
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) throw new NotFoundException('User does not exists')
    await this.userRepository.update({ id: user.id }, { password: body.password })
    return {
      message: 'Change password success please login try again',
      status: 200,
    }
  }

  facebookLogin(req) {
    if (!req.user) {
      return 'No user from facebook'
    }

    return {
      message: 'User information from facebook',
      user: req.user,
    }
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user,
    }
  }

  spotifyLogin(req) {
    if (!req.user) {
      return 'No user from spotify'
    }
    const user: Profile = req.user
    delete user._raw
    delete user._json
    const userProfile = { ...user, email: user.emails[0].value }
    delete userProfile.emails

    return {
      message: 'User information from spotify',
      user: userProfile,
    }
  }

  lineLogin() {
    const url = new URL(process.env.LINE_ME_URL + '/authorize')
    url.search = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.LINE_CLIENT_ID,
      redirect_uri: `${process.env.LINE_ENDPOIN}/auth/line/redirect`,
      state: randomUUID(),
      scope: 'profile openid email',
    }).toString()
    return url
  }

  async lineAccessToken(query) {
    const urlToken = process.env.LINE_ME_URL_TOKEN + '/token'
    const urlVerify = process.env.LINE_ME_URL_TOKEN + '/verify'
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    const bodyToken = new URLSearchParams({
      grant_type: 'authorization_code',
      code: query.code,
      redirect_uri: `${process.env.LINE_ENDPOIN}/auth/line/redirect`,
      client_id: process.env.LINE_CLIENT_ID,
      client_secret: process.env.LINE_CLIENT_SECRET,
    })
    const dataToken = await lastValueFrom(this.httpService.post(urlToken, bodyToken, { headers: headers }))
      .then((x) => x.data)
      .catch((err) => err.message)
    const bodyVerify = new URLSearchParams({
      id_token: dataToken.id_token,
      client_id: process.env.LINE_CLIENT_ID,
    })
    const dataVerify = await lastValueFrom(this.httpService.post(urlVerify, bodyVerify, { headers: headers }))
      .then((x) => x.data)
      .catch((err) => err.message)
    return dataVerify
  }
}
