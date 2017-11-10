#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Domain = require("domain");
var su = require("suman-utils");
var chalk = require("chalk");
var dashdash = require('dashdash');
var residence = require("residence");
var utils_1 = require("./lib/utils");
var get_stream_1 = require("./lib/get-stream");
process.on('uncaughtException', function (e) {
    utils_1.log.error("<suman-r> has captured an 'uncaughtException' => \n " + su.getCleanErrorString(e));
});
process.on('unhandledRejection', function (e) {
    utils_1.log.error("<suman-r> has captured an 'unhandledRejection' => \n " + su.getCleanErrorString(e));
});
process.once('exit', function () {
    console.log('\n');
    utils_1.log.info(' ---- suman-r end ----');
});
var projectRoot = residence.findProjectRoot(process.cwd());
if (!projectRoot) {
    utils_1.log.error('suman-r could not find a project root given your current working directory.');
    utils_1.log.error('cwd: ', process.cwd());
    throw new Error('suman-r could not find a project root given cwd.');
}
var opts, reporter, parser = dashdash.createParser({ options: utils_1.options });
try {
    opts = parser.parse(process.argv);
}
catch (e) {
    utils_1.log.error(' => suman-r CLI parsing error: %s', e.message);
    process.exit(1);
}
utils_1.registerReporter(projectRoot, opts.reporter || 'suman-reporters/modules/std-reporter');
var to = setTimeout(function () {
    utils_1.log.error(chalk.red('no input to suman-r stdin after 35 seconds, shutting down.'));
    process.exit(1);
}, 35000);
var clearStdinTimeout = function () {
    clearTimeout(to);
};
{
    var d = Domain.create();
    d.on('error', function (e) {
        utils_1.log.error(su.getCleanErrorString(e));
    });
    d.run(function () {
        process.stdin.resume().pipe(get_stream_1.getJSONStdioStream())
            .once('data', clearStdinTimeout)
            .on('error', function (e) {
            utils_1.log.error(su.getCleanErrorString(e));
        });
    });
}
