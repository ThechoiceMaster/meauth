"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyOauthStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_spotify_1 = require("passport-spotify");
class SpotifyOauthStrategy extends (0, passport_1.PassportStrategy)(passport_spotify_1.Strategy, 'spotify') {
    constructor() {
        super({
            clientID: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            callbackURL: 'http://localhost:4000/auth/spotify/redirect',
            scope: 'user-read-private user-read-email playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public',
        }, (accessToken, refreshToken, expires_in, profile, done) => {
            return done(null, profile, { accessToken, refreshToken, expires_in });
        });
    }
}
exports.SpotifyOauthStrategy = SpotifyOauthStrategy;
//# sourceMappingURL=spotify-oauth.strategy.js.map