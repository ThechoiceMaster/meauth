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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullMessageDto = exports.ResMessageDto = exports.StatusMessageDto = exports.JwtGetUserDto = exports.UserTokenDto = exports.RegisterResDto = exports.LoginResDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../schemas/user.entity");
class LoginResDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginResDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", UserTokenDto)
], LoginResDto.prototype, "data", void 0);
exports.LoginResDto = LoginResDto;
class RegisterResDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RegisterResDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", StatusMessageDto)
], RegisterResDto.prototype, "data", void 0);
exports.RegisterResDto = RegisterResDto;
class UserTokenDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", user_entity_1.User)
], UserTokenDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserTokenDto.prototype, "accessToken", void 0);
exports.UserTokenDto = UserTokenDto;
class JwtGetUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], JwtGetUserDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", user_entity_1.User)
], JwtGetUserDto.prototype, "data", void 0);
exports.JwtGetUserDto = JwtGetUserDto;
class StatusMessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StatusMessageDto.prototype, "status", void 0);
exports.StatusMessageDto = StatusMessageDto;
class ResMessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResMessageDto.prototype, "message", void 0);
exports.ResMessageDto = ResMessageDto;
class FullMessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FullMessageDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FullMessageDto.prototype, "status", void 0);
exports.FullMessageDto = FullMessageDto;
//# sourceMappingURL=response.dto.js.map