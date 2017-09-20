#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var suman_utils_1 = require("suman-utils");
process.on('uncaughtException', function (e) {
    console.error("<suman-r> has captured an 'uncaughtException' => \n " + suman_utils_1.default.getCleanErrorString(e));
});
process.on('unhandledRejection', function (e) {
    console.error("<suman-r> has captured an 'unhandledRejection' => \n " + suman_utils_1.default.getCleanErrorString(e));
});
process.once('exit', function () {
    console.log(' ---- suman-r end ----');
});
var dashdash = require("dashdash");
var get_stream_1 = require("./lib/get-stream");
var register_reporter_1 = require("./lib/register-reporter");
var suman_r_options_1 = require("./lib/suman-r-options");
var Domain = require("domain");
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
var d = Domain.create();
d.on('error', function (e) {
    console.log(suman_utils_1.default.getCleanErrorString(e));
});
d.run(function () {
    process.stdin.resume().pipe(get_stream_1.getStream('zoom'))
        .on('error', function (e) {
        console.log(suman_utils_1.default.getCleanErrorString(e));
    });
});
