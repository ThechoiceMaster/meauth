import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import env from './utils/env'

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    return `${this.configService.get(env.WELCOME)} this is smart service!`
  }
}
