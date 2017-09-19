#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dashdash = require("dashdash");
var get_stream_1 = require("./lib/get-stream");
var register_reporter_1 = require("./lib/register-reporter");
var suman_r_options_1 = require("./lib/suman-r-options");
var opts, reporter, parser = dashdash.createParser({ options: suman_r_options_1.options });
try {
    opts = parser.parse(process.argv);
}
catch (e) {
    console.error(' => suman-r CLI parsing error: %s', e.message);
    process.exit(1);
}
reporter = opts.reporter || 'std-reporter';
register_reporter_1.registerReporter(reporter);
process.stdin.resume().pipe(get_stream_1.getStream('zoom'));
