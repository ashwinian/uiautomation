"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getElementObject_1 = require("../../utils/getElementObject");
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
async function custom$$(strategyName, strategyArguments) {
    const browserObject = utils_1.getBrowserObject(this);
    const strategy = browserObject.strategies.get(strategyName);
    if (!strategy) {
        throw Error('No strategy found for ' + strategyName);
    }
    if (!this.elementId) {
        throw Error(`Can't call custom$ on element with selector "${this.selector}" because element wasn't found`);
    }
    let res = await this.execute(strategy, strategyArguments, this);
    if (!Array.isArray(res)) {
        res = [res];
    }
    res = res.filter(el => !!el && typeof el[constants_1.ELEMENT_KEY] === 'string');
    const elements = res.length ? await getElementObject_1.getElements.call(this, strategy, res) : [];
    return utils_1.enhanceElementsArray(elements, this, strategyName, 'custom$$', [strategyArguments]);
}
exports.default = custom$$;
