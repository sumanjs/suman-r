#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_stream_1 = require("./lib/get-stream");
process.stdin.resume();
process.stdin.pipe(get_stream_1.getStream('zoom'));
