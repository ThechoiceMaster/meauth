import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Global, Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { join } from 'path'
import { ConfigModule, ConfigService } from '@nestjs/config'
import env from 'src/utils/env'

@Global() // 👈 global module
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          service: config.get(env.MAIL_SERVICE),
          host: config.get(env.MAIL_HOST),
          secure: false,
          ignoreTLS: true,
          auth: {
            user: config.get(env.MAIL_USER),
            pass: config.get(env.MAIL_PASSWORD),
          },
        },
        defaults: {
          from: `"Smart Notification" <${config.get(env.MAIL_FROM)}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
