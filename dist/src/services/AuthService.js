"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const auth_1 = require("../../config/auth");
class AuthService {
    gerarToken(params = {}) {
        return jwt.sign(params, auth_1.default.secret, {
            expiresIn: 86400
        });
    }
    auth(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!auth.login) {
                    throw new TypeError(`Login não informado`);
                }
                if (!auth.senha) {
                    throw new TypeError(`Senha não informada`);
                }
                if (auth_1.default.user.login != auth.login) {
                    throw new TypeError(`Login inválido`);
                }
                if (auth_1.default.user.senha != auth.senha) {
                    throw new TypeError(`Senha inválida`);
                }
                return {
                    token: this.gerarToken({ id: Math.floor(Math.random() * 657) })
                };
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map