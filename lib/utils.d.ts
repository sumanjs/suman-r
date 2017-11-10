/// <reference types="node" />
import EE = require('events');
export declare const log: {
    info: any;
    warning: any;
    error: any;
    good: any;
    veryGood: any;
};
export declare const tb: EE;
export declare const options: Array<any>;
export declare const registerReporter: (projectRoot: string, name: string) => void;
