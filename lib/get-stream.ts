'use strict';

//core
import {Stream, Transform} from "stream";
import util = require('util');
import assert = require('assert');

//npm
import parser from 'tap-json-parser';
import {events} from 'suman-events';
import jsonStdio = require('json-stdio');

//project
import {tb, log} from "./utils";

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

  let stdEventName = jsonStdio.stdEventName;
  assert(typeof stdEventName === 'string',
    `Suman implementation error: 'json-stdio' library does not export expected property.`);

  p.on(stdEventName, function (obj: Object) {

    if (!obj) {
      log.warning(`Suman implementation warning: no json-stdio object passed to '${stdEventName}' handler.`);
      return;
    }

    const msgType = String(obj.messageType);

    if (msgType in events) {
      tb.emit(msgType, obj);
    }
    else {
      log.warning(' => json stdio object "messageType" property was not a key in suman-events.');
      log.warning(' => json stido object value:', util.inspect(obj));
    }

  });

  return p;

};
