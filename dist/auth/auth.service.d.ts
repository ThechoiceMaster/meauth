import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/user.entity';
import { Repository } from 'typeorm';
import { FullMessageDto, JwtGetUserDto, LoginResDto, RegisterResDto, ResMessageDto } from './interface/response.dto';
import { confirmPasswordDto, RegisterLocalDto } from './interface/request.dto';
import { HttpService } from '@nestjs/axios';
export declare class AuthService {
    private userRepository;
    private readonly jwtService;
    private readonly httpService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, httpService: HttpService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: User): LoginResDto;
    getOne(id: any): Promise<JwtGetUserDto>;
    createOne(user: RegisterLocalDto): Promise<RegisterResDto>;
    approveMail(token: string): Promise<ResMessageDto>;
    forgotPassword(email: string): Promise<FullMessageDto>;
    updatePassword(token: string, body: confirmPasswordDto): Promise<FullMessageDto>;
    facebookLogin(req: any): "No user from facebook" | {
        message: string;
        user: any;
    };
    googleLogin(req: any): "No user from google" | {
        message: string;
        user: any;
    };
    spotifyLogin(req: any): "No user from spotify" | {
        message: string;
        user: {
            email: string;
            provider: string;
            id: string;
            username: string;
            displayName: string;
            profileUrl: string;
            photos: [string];
            country: string;
            followers: number;
            product: string;
            emails?: [{
                value: string;
                type: null;
            }];
            _raw: string;
            _json: any;
        };
    };
    lineLogin(): URL;
    lineAccessToken(query: any): Promise<any>;
}
