export default function sync(testFn: any): Promise<any>;
import executeHooksWithArgs from "./executeHooksWithArgs";
import wrapCommand from "./wrapCommand";
import runFnInFiberContext from "./runFnInFiberContext";
export function executeSync(fn: Function, retries?: number, args?: any[]): Promise<any>;
export class executeSync {
    constructor(fn: Function, retries?: number, args?: any[]);
    wdioRetries: any;
}
export function runSync(fn: any, repeatTest?: number, args?: any[]): (resolve: any, reject: any) => any;
export { executeHooksWithArgs, wrapCommand, runFnInFiberContext };
//# sourceMappingURL=index.d.ts.map