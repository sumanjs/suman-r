import {tb} from "./testpoint-broadcaster";
import {events} from 'suman-events';
import su from 'suman-utils';
import log from './logging';
import chalk = require('chalk');

///////////////////////////////////////////////////////////////

export const registerReporter = function (name: string) {

  log.info('registering reporter with name => ', name);

  let reporterFn, pth;

  try {
    pth = require.resolve(name);
    log.info('reporter being loaded with the following path:');
    log.info(pth);
    reporterFn = require(pth);
  }
  catch (err) {
    pth = `suman-reporters/modules/${name}`;
    log.info(`reporter being loaded with the following resolved name '${chalk.magenta(pth)}'.`);
    reporterFn = require(pth);
  }

  if (!reporterFn) {
    throw new Error(`suman-r could not load a reporter using the following name '${name}'`);
  }

  debugger;
  reporterFn = reporterFn.default || reporterFn;
  reporterFn.call(null, tb, {}, {}, su);

};





