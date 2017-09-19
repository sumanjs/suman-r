#!/usr/bin/env node


import {getStream} from "./lib/get-stream";
import {registerReporter} from './lib/register-reporter';

registerReporter();

process.stdin.resume().pipe(getStream('zoom'));
