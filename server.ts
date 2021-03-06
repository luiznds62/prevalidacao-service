// Dependências
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as helmet from "helmet";
import * as hpp from "hpp";
import * as expressSanitized from "express-sanitized";

// Variáveis de Ambiente
import { environments } from "./config/environments";

// Middlewares
import globalMiddleware from "./src/middlewares/GlobalMiddleware";

// Controllers
import prevalidacao from "./src/controllers/PreValidacaoController";
import autenticacao from "./src/controllers/AuthController";

import { ResponseBuilder } from "./src/common/ResponseBuilder";

export class Server {
  application: any;

  initRoutes(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.application = express();
        this.application.use(cors());
        this.application.use(helmet());
        this.application.use(hpp());
        this.application.use(globalMiddleware);
        this.application.use(bodyParser.json({ limit: "50mb" }));
        this.application.use(
          bodyParser.urlencoded({ extended: true, limit: "50mb" })
        );
        this.application.use(expressSanitized());

        // Rotas
        let versao = "/api/v1";
        this.application.use(versao + "/prevalidacao", prevalidacao);
        this.application.use(versao + "/auth", autenticacao);

        this.application.get("/", (req, res) => {
          res.send(new ResponseBuilder(false, "Endpoint inválido"));
        });

        this.application.get("*", (req, res) => {
          res.redirect("/");
        });

        this.application = this.application.listen(
          environments.server.port,
          () => {
            resolve(this.application);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  bootstrap(): Promise<Server> {
    return this.initRoutes().then(() => this);
  }
}
