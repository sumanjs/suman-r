'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var EE = require("events");
var path = require("path");
var name = ' [suman-r] ';
exports.log = {
    info: console.log.bind(console, chalk.gray.bold(name)),
    warning: console.error.bind(console, chalk.yellow(name)),
    error: console.error.bind(console, chalk.red(name)),
    good: console.log.bind(console, chalk.cyan(name)),
    veryGood: console.log.bind(console, chalk.green(name))
};
exports.tb = new EE();
exports.options = [
    {
        names: ['reporter', 'reporters', 'reporter-paths', 'reporters-path'],
        type: 'string',
        help: 'Choose a desired reporter by name or path.'
    }
];
exports.registerReporter = function (projectRoot, name) {
    exports.log.info('Suman-R is registering reporter with name => ', name);
    var reporterFn, pth;
    try {
        pth = require.resolve(name);
        exports.log.info('reporter being loaded with the following path:');
        exports.log.info(pth);
        reporterFn = require(pth);
    }
    catch (err) {
        try {
            pth = "suman-reporters/modules/" + name;
            exports.log.info("reporter being loaded with the following resolved name '" + chalk.magenta(pth) + "'.");
            reporterFn = require(pth);
        }
        catch (err) {
            pth = path.resolve(projectRoot + ("/" + name));
            exports.log.info("reporter being loaded with the following resolved name '" + chalk.magenta(pth) + "'.");
            reporterFn = require(pth);
        }
    }
    if (!reporterFn) {
        throw new Error("suman-r could not load a reporter using the following name '" + name + ".'");
    }
    reporterFn = reporterFn.loadReporter || reporterFn.default || reporterFn;
    reporterFn.call(null, exports.tb, {});
};
