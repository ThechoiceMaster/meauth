"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = exports.AppResources = exports.AppRoles = void 0;
const nest_access_control_1 = require("nest-access-control");
var AppRoles;
(function (AppRoles) {
    AppRoles["AUTHOR"] = "AUTHOR";
    AppRoles["ADMIN"] = "ADMIN";
    AppRoles["BOT"] = "BOT";
})(AppRoles = exports.AppRoles || (exports.AppRoles = {}));
var AppResources;
(function (AppResources) {
    AppResources["USER"] = "USER";
})(AppResources = exports.AppResources || (exports.AppResources = {}));
exports.roles = new nest_access_control_1.RolesBuilder();
exports.roles
    .grant(AppRoles.AUTHOR)
    .updateOwn([AppResources.USER])
    .deleteOwn([AppResources.USER])
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.AUTHOR)
    .createAny([AppResources.USER])
    .updateAny([AppResources.USER])
    .deleteAny([AppResources.USER]);
//# sourceMappingURL=app.roles.js.map