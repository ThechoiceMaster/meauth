import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccessControlModule } from 'nest-access-control'
import { AppController } from './app.controller'
import { roles } from './app.roles'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { MailModule } from './mail/mail.module'
import env from './utils/env'

@Module({
  imports: [
    AccessControlModule.forRoles(roles),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cs: ConfigService) => ({
        type: 'mysql',
        host: cs.get(env.SQL_DB_HOST),
        port: cs.get<number>(env.SQL_DB_PORT),
        username: cs.get(env.SQL_DB_USER),
        password: cs.get(env.SQL_DB_PASSWORD),
        database: cs.get(env.SQL_DB_NAME),
        autoLoadEntities: true,
        synchronize: cs.get<boolean>(env.SQL_DB_SYNCHRONIZE),
        entities: [__dirname + '/../**/*.entity.js'],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    MailerModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
