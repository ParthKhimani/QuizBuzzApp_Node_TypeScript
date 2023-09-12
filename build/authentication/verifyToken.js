"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const { token } = req.body;
    try {
        jsonwebtoken_1.default.verify(token, "secret-key");
        next();
    }
    catch (error) {
        res.status(500).json("unautharized");
    }
};
exports.verifyToken = verifyToken;
