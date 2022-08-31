import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private mailerService;
    private configService;
    constructor(mailerService: MailerService, configService: ConfigService);
    private readonly logger;
    sendUserVerifyMail(email: string, token: string): Promise<void>;
    sendUserForgotPassWordMail(email: string, token: string): Promise<void>;
}
