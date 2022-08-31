"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const env_1 = require("../utils/env");
let MailService = MailService_1 = class MailService {
    constructor(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
        this.logger = new common_1.Logger(MailService_1.name);
    }
    async sendUserVerifyMail(email, token) {
        const base = this.configService.get(env_1.default.WEB_SITE_URL);
        const MAIL_SERVICE = this.configService.get(env_1.default.MAIL_SERVICE);
        const MAIL_HOST = this.configService.get(env_1.default.MAIL_HOST);
        const MAIL_USER = this.configService.get(env_1.default.MAIL_USER);
        const MAIL_PASSWORD = this.configService.get(env_1.default.MAIL_PASSWORD);
        const MAIL_FROM = this.configService.get(env_1.default.MAIL_FROM);
        const WEB_SITE_URL = this.configService.get(env_1.default.WEB_SITE_URL);
        const JWT_SECRET_KEY = this.configService.get(env_1.default.JWT_SECRET_KEY);
        this.logger.debug(base + ' =>>>>>>>> 1');
        this.logger.debug(MAIL_SERVICE + ' =>>>>>>>> 2');
        this.logger.debug(MAIL_HOST + ' =>>>>>>>> 3');
        this.logger.debug(MAIL_USER + ' =>>>>>>>> 4');
        this.logger.debug(MAIL_PASSWORD + ' =>>>>>>>> 5');
        this.logger.debug(MAIL_FROM + ' =>>>>>>>> 6');
        this.logger.debug(WEB_SITE_URL + ' =>>>>>>>> 7');
        this.logger.debug(JWT_SECRET_KEY + ' =>>>>>>>> 8');
        const url = `${base}/login/${token}`;
        await this.mailerService.sendMail({
            to: email,
            subject: 'Notification! Verify your Email',
            template: 'confirmation',
            context: {
                name: email,
                url,
            },
        });
    }
    async sendUserForgotPassWordMail(email, token) {
        const base = this.configService.get(env_1.default.WEB_SITE_URL);
        const url = `${base}/forgotpassword/${token}`;
        await this.mailerService.sendMail({
            to: email,
            subject: 'Notification! forgot your password.',
            template: 'forgotpassword',
            context: {
                url,
            },
        });
    }
};
MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService, config_1.ConfigService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map