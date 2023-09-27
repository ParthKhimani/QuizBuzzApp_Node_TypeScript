"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./Router/router"));
const errorHandler_1 = require("./exceptions/errorHandler");
require("dotenv/config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(router_1.default);
app.use(errorHandler_1.errorHandler);
mongoose_1.default.connect(`mongodb+srv://parth:${process.env.MONGODB_PASSWORD}@cluster0.eixcpta.mongodb.net/quiz?retryWrites=true&w=majority`);
app.listen(process.env.PORT, () => {
    console.log(`server started at port: ${process.env.PORT}`);
});
exports.default = app;
