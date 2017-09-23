"use strict";
var testpoint_broadcaster_1 = require("./testpoint-broadcaster");
var suman_utils_1 = require("suman-utils");
var chalk = require("chalk");
exports.registerReporter = function (name) {
    console.log('registering reporter with name => ', name);
    var reporterFn, pth;
    try {
        pth = require.resolve(name);
        console.log('reporter being loaded with the following path:');
        console.log(pth);
        reporterFn = require(pth);
    }
    catch (err) {
        pth = "suman-reporters/modules/" + name;
        console.log("reporter being loaded with the following resolved name '" + chalk.magenta(pth) + "'.");
        reporterFn = require(pth);
    }
    if (!reporterFn) {
        throw new Error("suman-r could not load a reporter using the following name '" + name + "'");
    }
    debugger;
    reporterFn = reporterFn.default || reporterFn;
    reporterFn.call(null, testpoint_broadcaster_1.tb, {}, {}, suman_utils_1.default);
};
