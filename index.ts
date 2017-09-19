#!/usr/bin/env node

import {getStream} from "./lib/get-stream";
import {registerReporter} from './lib/register-reporter';


process.stdin.resume();
process.stdin.pipe(getStream('zoom'));
