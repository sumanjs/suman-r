import parser from 'tap-json-parser';
import {tb} from "./testpoint-broadcaster";
import {events} from 'suman-events';

/////////////////////////////////////////////////////////////

export const getStream = function (type: string) {

  let p;

  p = parser();


  p.on('testpoint', function (testpoint: Object) {

    console.log('here is a testpoint');

    tb.emit(String(events.TEST_CASE_END), testpoint);

    if (testpoint.skip) {
      // throw new Error('testpoint.skip');
      tb.emit(String(events.TEST_CASE_SKIPPED), testpoint);
    }
    else if (testpoint.todo) {
      // throw new Error('testpoint.todo/stubbed');
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