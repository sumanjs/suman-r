'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
var tap_json_parser_1 = require("tap-json-parser");
var suman_events_1 = require("suman-events");
var jsonStdio = require("json-stdio");
var utils_1 = require("./utils");
exports.getTestPointStream = function () {
    var p;
    p = tap_json_parser_1.default();
    p.on('testpoint', function (testpoint) {
        debugger;
        utils_1.tb.emit(String(suman_events_1.events.TEST_CASE_END), testpoint);
        if (testpoint.skip) {
            utils_1.tb.emit(String(suman_events_1.events.TEST_CASE_SKIPPED), testpoint);
        }
        else if (testpoint.todo) {
            utils_1.tb.emit(String(suman_events_1.events.TEST_CASE_STUBBED), testpoint);
        }
        else if (testpoint.ok) {
            utils_1.tb.emit(String(suman_events_1.events.TEST_CASE_PASS), testpoint);
        }
        else {
            utils_1.tb.emit(String(suman_events_1.events.TEST_CASE_FAIL), testpoint);
        }
    });
    return p;
};
exports.getJSONStdioStream = function () {
    var p;
    p = jsonStdio.createParser();
    p.on(jsonStdio.stdEventName, function (obj) {
        if (!obj) {
            utils_1.log.warning('implementation warning: no jsonStdio object passed.');
            return;
        }
        var msgType = String(obj.messageType);
        if (msgType in suman_events_1.events) {
            utils_1.tb.emit(msgType, obj);
        }
        else {
            utils_1.log.warning('json stdio object messageType was not a key in suman-events.');
            utils_1.log.warning('Object value:', util.inspect(obj));
        }
    });
    return p;
};
