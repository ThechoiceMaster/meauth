import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    private config;
    constructor(userService: AuthService, config: ConfigService);
    validate(payload: any): Promise<import("../interface/response.dto").JwtGetUserDto>;
}
export {};
