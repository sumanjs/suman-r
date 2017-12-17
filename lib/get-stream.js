'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
var assert = require("assert");
var tap_json_parser_1 = require("tap-json-parser");
var suman_events_1 = require("suman-events");
var JSONStdio = require("json-stdio");
var chalk_1 = require("chalk");
var _ = require("lodash");
var utils_1 = require("./utils");
exports.getTestPointStream = function () {
    var p;
    p = tap_json_parser_1.default();
    p.on('testpoint', function (testpoint) {
        testpoint = testpoint.testCase || testpoint;
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
var kindMap = {
    warning: 'yellow',
    error: 'red',
    info: 'cyan',
    goodnews: 'green',
    good: 'green',
    verygood: 'green'
};
var logMessages = function (kind, messages) {
    var kindMapSearch = String(kind).trim().toLowerCase();
    var method = kindMap[kindMapSearch] || 'red';
    var fn = (chalk_1.default[method] || chalk_1.default.red).bold;
    _.flattenDeep([messages]).forEach(function (m) {
        utils_1.log.info(fn(m));
    });
};
exports.getJSONStdioStream = function () {
    var p = JSONStdio.createParser();
    var stdEventName = JSONStdio.stdEventName;
    assert(typeof stdEventName === 'string', "Suman implementation error: 'json-stdio' library does not export an expected property.");
    p.on(stdEventName, function (obj) {
        debugger;
        if (!obj) {
            utils_1.log.warning("Suman implementation warning: no json-stdio object passed to '" + stdEventName + "' handler.");
            return;
        }
        if (obj.sumanMessage === true) {
            logMessages(obj.kind, obj.messages || obj.message);
            return;
        }
        var msgType = String(obj.messageType);
        if (msgType in suman_events_1.events) {
            utils_1.tb.emit(msgType, obj);
        }
        else {
            utils_1.log.warning(' => json stdio object "messageType" property was not a key in suman-events.');
            utils_1.log.warning(' => json stido object value:', util.inspect(obj));
        }
    });
    return p;
};
