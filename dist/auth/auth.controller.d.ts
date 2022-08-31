import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserEntity } from 'src/schemas/user.entity';
import { confirmPasswordDto, ForgotPasswordDto, LoginLocalDto, RegisterLocalDto } from './interface/request.dto';
import { FullMessageDto, LoginResDto, RegisterResDto, ResMessageDto } from './interface/response.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(_: LoginLocalDto, user: UserEntity): Promise<LoginResDto>;
    register(user: RegisterLocalDto): Promise<RegisterResDto>;
    verifyMail(token: string): Promise<ResMessageDto>;
    refreshToken(user: UserEntity): Promise<LoginResDto>;
    forgotPassword(body: ForgotPasswordDto): Promise<FullMessageDto>;
    confirmPassword(token: string, body: confirmPasswordDto): Promise<FullMessageDto>;
    facebookLogin(): Promise<HttpStatus>;
    facebookLoginRedirect(req: Request, res: any): Promise<Response>;
    googleAuth(): Promise<HttpStatus>;
    googleAuthRedirect(req: any, res: any): Promise<Response>;
    Spotify(): void;
    spotifyAuthRedirect(req: any, res: any): Promise<Response>;
    line(res: any): Promise<Response>;
    lineAuthRedirect(res: any, query: any): Promise<Response>;
}
