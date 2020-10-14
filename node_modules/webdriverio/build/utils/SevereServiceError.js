"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SevereServiceError extends Error {
    constructor(message = 'Severe Service Error occurred.') {
        super(message);
        this.name = 'SevereServiceError';
    }
}
exports.default = SevereServiceError;
