import { Role } from 'nest-access-control';
export declare function Auth(...roles: Role[]): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
