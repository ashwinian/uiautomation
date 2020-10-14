"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function doubleClick() {
    if (!this.isW3C) {
        await this.moveTo();
        return this.positionDoubleClick();
    }
    return this.performActions([{
            type: 'pointer',
            id: 'pointer1',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', origin: this, x: 0, y: 0 },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 },
                { type: 'pause', duration: 10 },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
}
exports.default = doubleClick;
