"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Dependências
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const expressSanitized = require("express-sanitized");
// Variáveis de Ambiente
const environments_1 = require("./config/environments");
// Middlewares
const GlobalMiddleware_1 = require("./src/middlewares/GlobalMiddleware");
// Controllers
const PreValidacaoController_1 = require("./src/controllers/PreValidacaoController");
const AuthController_1 = require("./src/controllers/AuthController");
const ResponseBuilder_1 = require("./src/common/ResponseBuilder");
class Server {
    initRoutes() {
        return new Promise((resolve, reject) => {
            try {
                this.application = express();
                this.application.use(cors());
                this.application.use(helmet());
                this.application.use(hpp());
                this.application.use(GlobalMiddleware_1.default);
                this.application.use(bodyParser.json({ limit: "50mb" }));
                this.application.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
                this.application.use(expressSanitized());
                // Rotas
                let versao = "/api/v1";
                this.application.use(versao + "/prevalidacao", PreValidacaoController_1.default);
                this.application.use(versao + "/auth", AuthController_1.default);
                this.application.get("/", (req, res) => {
                    res.send(new ResponseBuilder_1.ResponseBuilder(false, "Endpoint inválido"));
                });
                this.application.get("*", (req, res) => {
                    res.redirect("/");
                });
                this.application = this.application.listen(environments_1.environments.server.port, () => {
                    resolve(this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap() {
        return this.initRoutes().then(() => this);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map