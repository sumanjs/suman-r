import parser from 'tap-json-parser';
import {tb} from "./testpoint-broadcaster";
import {events} from 'suman-events';
import util = require('util');
import log from './logging';

/////////////////////////////////////////////////////////////

export const getStream = function (type: string) {

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
