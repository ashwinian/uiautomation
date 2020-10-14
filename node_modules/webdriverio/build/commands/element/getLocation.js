"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
async function getLocation(prop) {
    let location = {};
    if (this.isW3C) {
        location = await utils_1.getElementRect(this);
        delete location.width;
        delete location.height;
    }
    else {
        location = await this.getElementLocation(this.elementId);
    }
    if (prop === 'x' || prop === 'y') {
        return location[prop];
    }
    return location;
}
exports.default = getLocation;
