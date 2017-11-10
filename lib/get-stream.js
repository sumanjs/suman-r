"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tap_json_parser_1 = require("tap-json-parser");
var testpoint_broadcaster_1 = require("./testpoint-broadcaster");
var suman_events_1 = require("suman-events");
exports.getStream = function (type) {
    var p;
    p = tap_json_parser_1.default();
    p.on('testpoint', function (testpoint) {
        debugger;
        testpoint_broadcaster_1.tb.emit(String(suman_events_1.events.TEST_CASE_END), testpoint);
        if (testpoint.skip) {
            testpoint_broadcaster_1.tb.emit(String(suman_events_1.events.TEST_CASE_SKIPPED), testpoint);
        }
        else if (testpoint.todo) {
            testpoint_broadcaster_1.tb.emit(String(suman_events_1.events.TEST_CASE_STUBBED), testpoint);
        }
        else if (testpoint.ok) {
            testpoint_broadcaster_1.tb.emit(String(suman_events_1.events.TEST_CASE_PASS), testpoint);
        }
        else {
            testpoint_broadcaster_1.tb.emit(String(suman_events_1.events.TEST_CASE_FAIL), testpoint);
        }
    });
    return p;
};
