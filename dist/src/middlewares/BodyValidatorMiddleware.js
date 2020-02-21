"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ajv = require("ajv");
const ResponseBuilder_1 = require("../common/ResponseBuilder");
exports.default = (req, res, next) => {
    if (req.body) {
        const ajv = new Ajv({ allErrors: true });
        const validate = ajv.compile(req.body);
        const isValidTranscriptBody = transcriptBody => {
            const isValid = validate(transcriptBody);
            if (!isValid) {
                return res.send(new ResponseBuilder_1.ResponseBuilder(false, "Corpo da requisição inválido"));
            }
            return next();
        };
    }
    else {
        return next();
    }
};
//# sourceMappingURL=BodyValidatorMiddleware.js.map