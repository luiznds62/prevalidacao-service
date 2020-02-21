import * as express from "express";
import * as path from "path";
import { PreValidacaoService } from "../services/PreValidacaoService";
import { ResponseBuilder } from "../common/ResponseBuilder";
import AuthMiddleware from "../middlewares/AuthMiddleware";

let preValidacaoService = new PreValidacaoService();
let router = express.Router();
router.use(AuthMiddleware);

router.post("/:uuid", async (req, res) => {
  try {
    let createdFie = await preValidacaoService.createValidationFile(
      req.body,
      req.params.uuid
    );
    res.send(
      new ResponseBuilder(true, "Arquivo criado com sucesso", createdFie)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.post("/montar/:uuid", async (req, res) => {
  try {
    let createdFie = await preValidacaoService.mountValidations(
      req.params.uuid
    );
    res.send(
      new ResponseBuilder(true, "Arquivo montado com sucesso", createdFie)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.put("/:uuid", async (req, res) => {
  try {
    let updatedFile = await preValidacaoService.insertValidation(
      req.body,
      req.params.uuid
    );
    res.send(
      new ResponseBuilder(true, "Validações inseridas com sucesso", updatedFile)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.get("/:uuid", async (req, res) => {
  try {
    res.download(
      path.join(__dirname + `../../pre-validacoes/${req.params.uuid}.html`)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

export default router;
