"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const express_1 = __importDefault(require("express"));
exports.client = express_1.default.Router();
exports.client.get("/cliente", (request, response) => {
    response.send("Hello cliente");
});
//# sourceMappingURL=cliente.js.map