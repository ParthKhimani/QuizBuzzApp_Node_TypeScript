"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        msg: err.message,
        stack: err.stack,
    });
};
exports.errorHandler = errorHandler;
