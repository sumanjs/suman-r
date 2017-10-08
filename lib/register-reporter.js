"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testpoint_broadcaster_1 = require("./testpoint-broadcaster");
var suman_utils_1 = require("suman-utils");
var logging_1 = require("./logging");
var chalk = require("chalk");
exports.registerReporter = function (name) {
    logging_1.default.info('registering reporter with name => ', name);
    var reporterFn, pth;
    try {
        pth = require.resolve(name);
        logging_1.default.info('reporter being loaded with the following path:');
        logging_1.default.info(pth);
        reporterFn = require(pth);
    }
    catch (err) {
        pth = "suman-reporters/modules/" + name;
        logging_1.default.info("reporter being loaded with the following resolved name '" + chalk.magenta(pth) + "'.");
        reporterFn = require(pth);
    }
    if (!reporterFn) {
        throw new Error("suman-r could not load a reporter using the following name '" + name + "'");
    }
    debugger;
    reporterFn = reporterFn.default || reporterFn;
    reporterFn.call(null, testpoint_broadcaster_1.tb, {}, {}, suman_utils_1.default);
};
