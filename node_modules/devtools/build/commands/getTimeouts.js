"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTimeouts() {
    return {
        implicit: this.timeouts.get('implicit'),
        pageLoad: this.timeouts.get('pageLoad'),
        script: this.timeouts.get('script')
    };
}
exports.default = getTimeouts;
