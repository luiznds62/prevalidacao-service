"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rateLimiter = require("express-rate-limit");
function rateLimit(time, maxReq, message) {
    return rateLimiter({
        windowsMs: time,
        max: maxReq,
        message: message
    });
}
exports.default = rateLimit;
//# sourceMappingURL=RateLimiter.js.map