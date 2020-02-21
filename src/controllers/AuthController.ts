import * as express from "express";
import { ResponseBuilder } from "../common/ResponseBuilder";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();
let router = express.Router();

router.post("/", async (req, res) => {
  try {
    let token = await authService.auth(req.body);

    res.send(new ResponseBuilder(true, "Autenticado com sucesso", token));
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

export default router;
