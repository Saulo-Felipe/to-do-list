"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cliente_1 = require("./routes/cliente");
const app = (0, express_1.default)();
app.get("/", (request, response) => {
    response.send("Hello, world!");
});
app.use("/", cliente_1.client);
app.listen(8081, () => console.log("Server is running on port 8081"));
//# sourceMappingURL=index.js.map