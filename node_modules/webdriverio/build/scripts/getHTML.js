"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getHTML(element, includeSelectorTag) {
    return element[includeSelectorTag ? 'outerHTML' : 'innerHTML'];
}
exports.default = getHTML;
