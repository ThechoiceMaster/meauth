import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import env from './utils/env'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configService = app.get(ConfigService)

  // Swagger
  const options = new DocumentBuilder().setTitle('SMART SERVICE').addBearerAuth().setVersion('1.0.0').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-doc', app, document)

  await app.listen(configService.get(env.PORT) || 3000)
}
bootstrap()
