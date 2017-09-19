#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_stream_1 = require("./lib/get-stream");
var register_reporter_1 = require("./lib/register-reporter");
register_reporter_1.registerReporter();
process.stdin.resume().pipe(get_stream_1.getStream('zoom'));
