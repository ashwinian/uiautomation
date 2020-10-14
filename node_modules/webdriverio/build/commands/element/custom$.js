"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getElementObject_1 = require("../../utils/getElementObject");
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
async function custom$(strategyName, strategyArguments) {
    const browserObject = utils_1.getBrowserObject(this);
    const strategy = browserObject.strategies.get(strategyName);
    if (!strategy) {
        throw Error('No strategy found for ' + strategyName);
    }
    if (!this.elementId) {
        throw Error(`Can't call custom$ on element with selector "${this.selector}" because element wasn't found`);
    }
    let res = await this.execute(strategy, strategyArguments, this);
    if (Array.isArray(res)) {
        res = res[0];
    }
    if (res && typeof res[constants_1.ELEMENT_KEY] === 'string') {
        return await getElementObject_1.getElement.call(this, strategy, res);
    }
    throw Error('Your locator strategy script must return an element');
}
exports.default = custom$;
