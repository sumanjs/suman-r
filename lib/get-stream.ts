'use strict';

//core
import {Stream, Transform} from "stream";
import util = require('util');

//npm
import parser from 'tap-json-parser';
import {events} from 'suman-events';
import jsonStdio = require('json-stdio');

//project
import {tb, log, js} from "./utils";

//////////////////////////////////////////////////////////////////////////////////////

export const getTestPointStream = function () {

  let p;

  p = parser();

  p.on('testpoint', function (testpoint: Object) {

    debugger;

    tb.emit(String(events.TEST_CASE_END), testpoint);

    if (testpoint.skip) {
      tb.emit(String(events.TEST_CASE_SKIPPED), testpoint);
    }
    else if (testpoint.todo) {
      tb.emit(String(events.TEST_CASE_STUBBED), testpoint);
    }
    else if (testpoint.ok) {
      tb.emit(String(events.TEST_CASE_PASS), testpoint);
    }
    else {
      tb.emit(String(events.TEST_CASE_FAIL), testpoint);
    }
  });

  return p;

};

export const getJSONStdioStream = function () {

  let p;

  p = jsonStdio.createParser();

  p.on(jsonStdio.stdEventName, function (obj: Object) {

    if (!obj) {
      log.warning('implementation warning: no jsonStdio object passed.');
      return;
    }

    const msgType = String(obj.messageType);

    if (msgType in events) {
      tb.emit(msgType, obj);
    }
    else {
      log.warning('json stdio object messageType was not a key in suman-events.');
      log.warning('Object value:', util.inspect(obj));
    }

  });

  return p;

};
