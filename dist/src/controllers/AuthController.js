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
const express = require("express");
const RateLimiter_1 = require("../common/RateLimiter");
const ResponseBuilder_1 = require("../common/ResponseBuilder");
const AuthService_1 = require("../services/AuthService");
const authService = new AuthService_1.AuthService();
let router = express.Router();
router.post("/", RateLimiter_1.default(60 * 1000, 20, "Excedido número de autenticações por minuto"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = yield authService.auth(req.body);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Autenticado com sucesso", token));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
exports.default = router;
//# sourceMappingURL=AuthController.js.map