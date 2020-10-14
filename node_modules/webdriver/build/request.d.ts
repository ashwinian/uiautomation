/// <reference types="node" />
import { EventEmitter } from 'events';
import * as got from 'got';
import { Options } from './types';
export interface WebDriverResponse {
    value: any;
    status?: number;
    sessionId?: string;
}
export default class WebDriverRequest extends EventEmitter {
    body?: Record<string, unknown>;
    method: string;
    endpoint: string;
    isHubCommand: boolean;
    requiresSessionId: boolean;
    defaultOptions: got.Options;
    constructor(method: string, endpoint: string, body?: Record<string, unknown>, isHubCommand?: boolean);
    makeRequest(options: Options, sessionId?: string): Promise<WebDriverResponse>;
    private _createOptions;
    private _request;
}
//# sourceMappingURL=request.d.ts.map