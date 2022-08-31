import { User } from 'src/schemas/user.entity';
export declare class LoginResDto {
    message: string;
    data: UserTokenDto;
}
export declare class RegisterResDto {
    message: string;
    data: StatusMessageDto;
}
export declare class UserTokenDto {
    user: User;
    accessToken: string;
}
export declare class JwtGetUserDto {
    message: string;
    data: User;
}
export declare class StatusMessageDto {
    status: string;
}
export declare class ResMessageDto {
    message: string;
}
export declare class FullMessageDto {
    message: string;
    status: number;
}
