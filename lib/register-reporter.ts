import {tb} from "./testpoint-broadcaster";
import {events} from 'suman-events';


export const registerReporter = function(){

  tb.on(String(events.TEST_CASE_END), function(data){
    console.log('test case end');
  });

  tb.on(String(events.TEST_CASE_PASS), function(data){
    console.log('test case pass');
  });

  tb.on(String(events.TEST_CASE_FAIL), function(data){
    console.log('test case fail');
  });

};





