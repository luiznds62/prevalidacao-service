import * as Ajv from "ajv";
import { ResponseBuilder } from "../common/ResponseBuilder";

export default (req, res, next) => {
  try {
    if (req.body) {
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(req.body);

      const isValidTranscriptBody = transcriptBody => {
        const isValid = validate(transcriptBody);
        if (!isValid) {
          return res.send(
            new ResponseBuilder(false, "Corpo da requisição inválido")
          );
        }
        return next();
      };
    } else {
      return next();
    }
  } catch (error) {
    return res.send(new ResponseBuilder(false, "Erro interno do servidor"));
  }
};
