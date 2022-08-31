import { RolesBuilder } from 'nest-access-control';
export declare enum AppRoles {
    AUTHOR = "AUTHOR",
    ADMIN = "ADMIN",
    BOT = "BOT"
}
export declare enum AppResources {
    USER = "USER"
}
export declare const roles: RolesBuilder;
