"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testpoint_broadcaster_1 = require("./testpoint-broadcaster");
var suman_events_1 = require("suman-events");
exports.registerReporter = function () {
    testpoint_broadcaster_1.tb.on(String(suman_events_1.events.TEST_CASE_END), function (data) {
        console.log('test case end');
    });
    testpoint_broadcaster_1.tb.on(String(suman_events_1.events.TEST_CASE_PASS), function (data) {
        console.log('test case pass');
    });
    testpoint_broadcaster_1.tb.on(String(suman_events_1.events.TEST_CASE_FAIL), function (data) {
        console.log('test case fail');
    });
};
