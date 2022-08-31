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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../schemas/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt_1 = require("bcrypt");
const crypto_1 = require("crypto");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, httpService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.httpService = httpService;
    }
    async validateUser(email, pass) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where({ email })
            .addSelect('user.password')
            .getOne();
        if (user && user.status !== 'active')
            throw new common_1.ForbiddenException('User does not active!, Please verify your email or contact the support team');
        if (user && (await (0, bcrypt_1.compare)(pass, user.password))) {
            const { password } = user, rest = __rest(user, ["password"]);
            return rest;
        }
        return null;
    }
    login(user) {
        const { id } = user, rest = __rest(user, ["id"]);
        const payload = { sub: id };
        return {
            message: 'Login success',
            data: {
                user,
                accessToken: this.jwtService.sign(payload),
            },
        };
    }
    async getOne(id) {
        const data = await this.userRepository.findOne({ where: { id } });
        if (!data)
            throw new common_1.NotFoundException('User does not exists');
        return { message: 'Is a user', data };
    }
    async createOne(user) {
        const duplicate = await this.userRepository.findOne({
            where: { email: user.email },
        });
        if (duplicate)
            throw new common_1.BadRequestException('This email is already in the system.');
        const newUser = await this.userRepository.create({
            email: user.email,
            password: user.password,
        });
        const isUser = await this.userRepository.save(newUser);
        const { id } = isUser, rest = __rest(isUser, ["id"]);
        const payload = { id: id };
        return {
            message: 'Register success please verify your email',
            data: {
                status: 'success',
            },
        };
    }
    async approveMail(token) {
        const user = this.jwtService.decode(token);
        if (!user.id)
            throw new common_1.NotFoundException('User does not exists');
        await this.userRepository.update({ id: user.id }, {
            status: 'active',
        });
        return {
            message: 'success',
        };
    }
    async forgotPassword(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user)
            throw new common_1.NotFoundException('User does not exists');
        const payload = { id: user.id };
        return {
            message: 'Success please check your email',
            status: 200,
        };
    }
    async updatePassword(token, body) {
        const { id } = this.jwtService.decode(token);
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User does not exists');
        await this.userRepository.update({ id: user.id }, { password: body.password });
        return {
            message: 'Change password success please login try again',
            status: 200,
        };
    }
    facebookLogin(req) {
        if (!req.user) {
            return 'No user from facebook';
        }
        return {
            message: 'User information from facebook',
            user: req.user,
        };
    }
    googleLogin(req) {
        if (!req.user) {
            return 'No user from google';
        }
        return {
            message: 'User information from google',
            user: req.user,
        };
    }
    spotifyLogin(req) {
        if (!req.user) {
            return 'No user from spotify';
        }
        const user = req.user;
        delete user._raw;
        delete user._json;
        const userProfile = Object.assign(Object.assign({}, user), { email: user.emails[0].value });
        delete userProfile.emails;
        return {
            message: 'User information from spotify',
            user: userProfile,
        };
    }
    lineLogin() {
        const url = new URL(process.env.LINE_ME_URL + '/authorize');
        url.search = new URLSearchParams({
            response_type: 'code',
            client_id: process.env.LINE_CLIENT_ID,
            redirect_uri: `${process.env.LINE_ENDPOIN}/auth/line/redirect`,
            state: (0, crypto_1.randomUUID)(),
            scope: 'profile openid email',
        }).toString();
        return url;
    }
    async lineAccessToken(query) {
        const urlToken = process.env.LINE_ME_URL_TOKEN + '/token';
        const urlVerify = process.env.LINE_ME_URL_TOKEN + '/verify';
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const bodyToken = new URLSearchParams({
            grant_type: 'authorization_code',
            code: query.code,
            redirect_uri: `${process.env.LINE_ENDPOIN}/auth/line/redirect`,
            client_id: process.env.LINE_CLIENT_ID,
            client_secret: process.env.LINE_CLIENT_SECRET,
        });
        const dataToken = await (0, rxjs_1.lastValueFrom)(this.httpService.post(urlToken, bodyToken, { headers: headers }))
            .then((x) => x.data)
            .catch((err) => err.message);
        const bodyVerify = new URLSearchParams({
            id_token: dataToken.id_token,
            client_id: process.env.LINE_CLIENT_ID,
        });
        const dataVerify = await (0, rxjs_1.lastValueFrom)(this.httpService.post(urlVerify, bodyVerify, { headers: headers }))
            .then((x) => x.data)
            .catch((err) => err.message);
        return dataVerify;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        axios_1.HttpService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map