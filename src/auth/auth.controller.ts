import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Auth, User } from 'src/common/decorators'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { User as UserEntity } from 'src/schemas/user.entity'
import { confirmPasswordDto, ForgotPasswordDto, LoginLocalDto, RegisterLocalDto } from './interface/request.dto'
import { FullMessageDto, LoginResDto, RegisterResDto, ResMessageDto } from './interface/response.dto'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { SpotifyOauthGuard } from './guards/spotify-oauth.guard'
import Instagram from 'passport-instagram'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ====================================== local ====================================== //

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() _: LoginLocalDto, @User() user: UserEntity): Promise<LoginResDto> {
    return this.authService.login(user)
  }

  @Post('register')
  async register(@Body() user: RegisterLocalDto): Promise<RegisterResDto> {
    return this.authService.createOne(user)
  }

  @Get('confirm/:token')
  async verifyMail(@Param('token') token: string): Promise<ResMessageDto> {
    return await this.authService.approveMail(token)
  }

  @Auth()
  @Get('refresh')
  async refreshToken(@User() user: UserEntity): Promise<LoginResDto> {
    return this.authService.login(user)
  }

  @Post('forgotpassword')
  async forgotPassword(@Body() body: ForgotPasswordDto): Promise<FullMessageDto> {
    const { email } = body
    return this.authService.forgotPassword(email)
  }

  @Post('confirmpassword/:token')
  async confirmPassword(@Param('token') token: string, @Body() body: confirmPasswordDto): Promise<FullMessageDto> {
    return this.authService.updatePassword(token, body)
  }

  // ====================================== facebook ====================================== //

  // facebook
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<HttpStatus> {
    return HttpStatus.OK
  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request, @Res() res): Promise<Response> {
    const data = this.authService.facebookLogin(req)
    console.log(data, 'facebook')
    return res.redirect(process.env.DEFAULT_REDIRECT)
  }

  // ====================================== google ====================================== //

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<HttpStatus> {
    return HttpStatus.OK
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res): Promise<Response> {
    const data = this.authService.googleLogin(req)
    console.log(data, 'google')
    return res.redirect(process.env.DEFAULT_REDIRECT)
  }

  // ====================================== Spotify ====================================== //

  @UseGuards(SpotifyOauthGuard)
  @Get('spotify')
  Spotify(): void {
    return
  }

  @UseGuards(SpotifyOauthGuard)
  @Get('spotify/redirect')
  async spotifyAuthRedirect(@Req() req: any, @Res() res): Promise<Response> {
    const data = this.authService.spotifyLogin(req)
    console.log(data, 'spotify')
    return res.redirect(process.env.DEFAULT_REDIRECT)
  }

  // ====================================== Line ====================================== //

  @Get('line')
  async line(@Res() res): Promise<Response> {
    const url = this.authService.lineLogin()
    return res.redirect(url.href)
  }

  @Get('line/redirect')
  async lineAuthRedirect(@Res() res, @Query() query): Promise<Response> {
    const data = await this.authService.lineAccessToken(query)
    console.log(data, 'line')
    return res.redirect(process.env.DEFAULT_REDIRECT)
  }

  // ====================================== Instagram ================================= //
}
