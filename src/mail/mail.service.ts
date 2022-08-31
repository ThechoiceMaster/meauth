import { MailerService } from '@nestjs-modules/mailer'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import env from 'src/utils/env'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, private configService: ConfigService) {}

  private readonly logger = new Logger(MailService.name)

  async sendUserVerifyMail(email: string, token: string) {
    const base = this.configService.get(env.WEB_SITE_URL)
    const MAIL_SERVICE = this.configService.get(env.MAIL_SERVICE)
    const MAIL_HOST = this.configService.get(env.MAIL_HOST)
    const MAIL_USER = this.configService.get(env.MAIL_USER)
    const MAIL_PASSWORD = this.configService.get(env.MAIL_PASSWORD)
    const MAIL_FROM = this.configService.get(env.MAIL_FROM)
    const WEB_SITE_URL = this.configService.get(env.WEB_SITE_URL)
    const JWT_SECRET_KEY = this.configService.get(env.JWT_SECRET_KEY)

    this.logger.debug(base + ' =>>>>>>>> 1')
    this.logger.debug(MAIL_SERVICE + ' =>>>>>>>> 2')
    this.logger.debug(MAIL_HOST + ' =>>>>>>>> 3')
    this.logger.debug(MAIL_USER + ' =>>>>>>>> 4')
    this.logger.debug(MAIL_PASSWORD + ' =>>>>>>>> 5')
    this.logger.debug(MAIL_FROM + ' =>>>>>>>> 6')
    this.logger.debug(WEB_SITE_URL + ' =>>>>>>>> 7')
    this.logger.debug(JWT_SECRET_KEY + ' =>>>>>>>> 8')

    const url = `${base}/login/${token}`
    await this.mailerService.sendMail({
      to: email,
      subject: 'Notification! Verify your Email',
      template: 'confirmation',
      context: {
        name: email,
        url,
      },
    })
  }

  async sendUserForgotPassWordMail(email: string, token: string) {
    const base = this.configService.get(env.WEB_SITE_URL)
    const url = `${base}/forgotpassword/${token}`
    await this.mailerService.sendMail({
      to: email,
      subject: 'Notification! forgot your password.',
      template: 'forgotpassword',
      context: {
        url,
      },
    })
  }
}
