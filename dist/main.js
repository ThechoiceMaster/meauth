"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const env_1 = require("./utils/env");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const options = new swagger_1.DocumentBuilder().setTitle('SMART SERVICE').addBearerAuth().setVersion('1.0.0').build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api-doc', app, document);
    await app.listen(configService.get(env_1.default.PORT) || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map