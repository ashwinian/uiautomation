"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (_, script, dataProperty, dataFlag, ...args) => {
    window.arguments = args;
    const result = eval(script);
    let tmpResult = result instanceof NodeList ? Array.from(result) : result;
    const isResultArray = Array.isArray(tmpResult);
    tmpResult = isResultArray ? tmpResult : [tmpResult];
    if (tmpResult.find((r) => r instanceof HTMLElement)) {
        tmpResult = tmpResult.map((r, i) => {
            if (r instanceof HTMLElement) {
                const dataPropertyValue = `${dataFlag}_${i}`;
                r.setAttribute(dataProperty, dataPropertyValue);
                return dataPropertyValue;
            }
            return result;
        });
    }
    return isResultArray ? tmpResult : tmpResult[0];
};
