"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstancesData = exports.sendFailureMessage = exports.filterLogTypes = exports.initialiseInstance = exports.sanitizeCaps = exports.runHook = void 0;
const deepmerge_1 = __importDefault(require("deepmerge"));
const logger_1 = __importDefault(require("@wdio/logger"));
const webdriverio_1 = require("webdriverio");
const webdriver_1 = require("webdriver");
const config_1 = require("@wdio/config");
const log = logger_1.default('@wdio/local-runner:utils');
const MERGE_OPTIONS = { clone: false };
const mochaAllHooks = ['"before all" hook', '"after all" hook'];
function runHook(hookName, config, caps, specs) {
    const catchFn = (e) => log.error(`Error in ${hookName}: ${e.stack}`);
    return config && Array.isArray(config[hookName]) ? Promise.all(config[hookName].map((hook) => {
        try {
            return hook(config, caps, specs);
        }
        catch (e) {
            return catchFn(e);
        }
    })).catch(catchFn) : undefined;
}
exports.runHook = runHook;
function sanitizeCaps(caps, filterOut) {
    const defaultConfigsKeys = [
        ...Object.keys(config_1.DEFAULT_CONFIGS()),
        ...Object.keys(webdriver_1.DEFAULTS)
    ];
    return Object.keys(caps).filter(key => (!defaultConfigsKeys.includes(key) === !filterOut)).reduce((obj, key) => {
        obj[key] = caps[key];
        return obj;
    }, {});
}
exports.sanitizeCaps = sanitizeCaps;
async function initialiseInstance(config, capabilities, isMultiremote) {
    if (config.sessionId) {
        log.debug(`attach to session with id ${config.sessionId}`);
        config.capabilities = sanitizeCaps(capabilities);
        return webdriverio_1.attach({ ...config });
    }
    if (!isMultiremote) {
        log.debug('init remote session');
        const sessionConfig = { ...config, ...sanitizeCaps(capabilities, true) };
        sessionConfig.capabilities = sanitizeCaps(capabilities);
        return webdriverio_1.remote(sessionConfig);
    }
    const options = {};
    log.debug('init multiremote session');
    delete config.capabilities;
    for (let browserName of Object.keys(capabilities)) {
        options[browserName] = deepmerge_1.default(config, capabilities[browserName], MERGE_OPTIONS);
    }
    const browser = await webdriverio_1.multiremote(options, config);
    for (let browserName of Object.keys(capabilities)) {
        global[browserName] = browser[browserName];
    }
    return browser;
}
exports.initialiseInstance = initialiseInstance;
function filterLogTypes(excludeDriverLogs, driverLogTypes) {
    let logTypes = [...driverLogTypes];
    if (Array.isArray(excludeDriverLogs)) {
        log.debug('filtering logTypes', logTypes);
        if (excludeDriverLogs.length === 1 && excludeDriverLogs[0] === '*') {
            logTypes = [];
        }
        else {
            logTypes = logTypes.filter(x => !excludeDriverLogs.includes(x));
        }
        log.debug('filtered logTypes', logTypes);
    }
    return logTypes;
}
exports.filterLogTypes = filterLogTypes;
function sendFailureMessage(e, payload) {
    if (e === 'test:fail' || (e === 'hook:end' && payload.error && mochaAllHooks.some(hook => payload.title.startsWith(hook)))) {
        process.send({
            origin: 'reporter',
            name: 'printFailureMessage',
            content: payload
        });
    }
}
exports.sendFailureMessage = sendFailureMessage;
function getInstancesData(browser, isMultiremote) {
    let instances;
    if (isMultiremote) {
        instances = {};
        browser.instances.forEach(i => {
            const { protocol, hostname, port, path, queryParams } = browser[i].options;
            const { isW3C, sessionId } = browser[i];
            instances[i] = { sessionId, isW3C, protocol, hostname, port, path, queryParams };
        });
    }
    return instances;
}
exports.getInstancesData = getInstancesData;
