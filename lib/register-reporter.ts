import {tb} from "./testpoint-broadcaster";
import {events} from 'suman-events';
import su from 'suman-utils';
import chalk = require('chalk');

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
    console.log(`reporter being loaded with the following resolved name '${chalk.magenta(pth)}'.`);
    reporterFn = require(pth);
  }

  if (!reporterFn) {
    throw new Error(`suman-r could not load a reporter using the following name '${name}'`);
  }

  debugger;
  reporterFn = reporterFn.default || reporterFn;
  reporterFn.call(null, tb, {}, {}, su);

};





