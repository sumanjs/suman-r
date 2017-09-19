import {tb} from "./testpoint-broadcaster";
import {events} from 'suman-events';

export const registerReporter = function (name: string) {

  console.log('registering reporter with name => ', name);

  let reporterFn, pth;

  try {
    pth = require.resolve(name);
    console.log('reporter being loaded with the following path:');
    console.log(pth);
    reporterFn = require(pth);
  }
  catch (err) {
    pth = `suman-reporters/modules/${name}`;
    console.log(`reporter being loaded with the following resolved name ${pth}.`);
    reporterFn = require(pth);
  }

  if (!reporterFn) {
    throw new Error(`suman-r could not load a reporter using the following name '${name}'`);
  }

  debugger;
  reporterFn = reporterFn.default || reporterFn;
  reporterFn.call(null, tb);

  // tb.on(String(events.TEST_CASE_END), function (data) {
  //   console.log('test case end');
  // });
  //
  // tb.on(String(events.TEST_CASE_PASS), function (data) {
  //   console.log('test case pass');
  // });
  //
  // tb.on(String(events.TEST_CASE_FAIL), function (data) {
  //   console.log('test case fail');
  // });

};





