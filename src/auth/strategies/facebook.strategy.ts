import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-facebook'

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: 'http://localhost:4000/auth/facebook/redirect',
      scope: 'email',
      profileFields: ['id', 'name', 'emails', 'photos'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { id, emails, name, photos } = profile
    const user = {
      id,
      email: emails[0].value,
      name: name.givenName,
      photos: photos[0].value,
    }
    const payload = {
      user,
      accessToken,
    }
    done(null, payload)
  }
}
