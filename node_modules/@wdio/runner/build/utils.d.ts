export function runHook(hookName: any, config: any, caps: any, specs: any): Promise<void | [any, any, any, any, any, any, any, any, any, any]> | undefined;
export function sanitizeCaps(caps: Object, filterOut: any): Object;
export function initialiseInstance(config: Object, capabilities: Object, isMultiremote: boolean): Promise<any>;
export function filterLogTypes(excludeDriverLogs: string[], driverLogTypes: string[]): string[];
export function sendFailureMessage(e: string, payload: object): void;
export function getInstancesData(browser: object, isMultiremote: boolean): object;
//# sourceMappingURL=utils.d.ts.map