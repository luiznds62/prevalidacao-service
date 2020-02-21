"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const server = new server_1.Server();
server
    .bootstrap()
    .then(server => {
    console.log(`Servidor ouvindo em: `, server.application.address());
})
    .catch(error => {
    console.log("Servidor apresentou um erro ao iniciar");
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map