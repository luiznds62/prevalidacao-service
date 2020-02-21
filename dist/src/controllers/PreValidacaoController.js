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
const path = require("path");
const PreValidacaoService_1 = require("../services/PreValidacaoService");
const ResponseBuilder_1 = require("../common/ResponseBuilder");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
let preValidacaoService = new PreValidacaoService_1.PreValidacaoService();
let router = express.Router();
router.use(AuthMiddleware_1.default);
router.post("/:uuid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let createdFie = yield preValidacaoService.createValidationFile(req.body, req.params.uuid);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Arquivo criado com sucesso", createdFie));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.post("/montar/:uuid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let createdFie = yield preValidacaoService.mountValidations(req.params.uuid);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Arquivo montado com sucesso", createdFie));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.put("/:uuid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updatedFile = yield preValidacaoService.insertValidation(req.body, req.params.uuid);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Validações inseridas com sucesso", updatedFile));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.get("/:uuid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.download(path.join(__dirname + `../../pre-validacoes/${req.params.uuid}.html`));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
exports.default = router;
//# sourceMappingURL=PreValidacaoController.js.map