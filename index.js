#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var su = require("suman-utils");
var logging_1 = require("./lib/logging");
process.on('uncaughtException', function (e) {
    logging_1.default.error("<suman-r> has captured an 'uncaughtException' => \n " + su.getCleanErrorString(e));
});
process.on('unhandledRejection', function (e) {
    logging_1.default.error("<suman-r> has captured an 'unhandledRejection' => \n " + su.getCleanErrorString(e));
});
process.once('exit', function () {
    console.log('\n');
    logging_1.default.info(' ---- suman-r end ----');
});
var chalk = require("chalk");
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
    logging_1.default.error(' => suman-r CLI parsing error: %s', e.message);
    process.exit(1);
}
reporter = opts.reporter || 'std-reporter';
register_reporter_1.registerReporter(reporter);
var d = Domain.create();
d.on('error', function (e) {
    logging_1.default.error(su.getCleanErrorString(e));
});
var to = setTimeout(function () {
    logging_1.default.error(chalk.red('no input to suman-r stdin after 10 seconds, shutting down.'));
    process.exit(1);
}, 5000);
var clearStdinTimeout = function () {
    clearTimeout(to);
};
d.run(function () {
    process.stdin.resume().pipe(get_stream_1.getStream('zoom'))
        .once('data', clearStdinTimeout)
        .on('error', function (e) {
        logging_1.default.error(su.getCleanErrorString(e));
    });
});
