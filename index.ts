#!/usr/bin/env node
'use strict';

//core
import Domain = require('domain');

//npm
import su = require('suman-utils');
import chalk = require('chalk');
const dashdash = require('dashdash');

//project
import {log, registerReporter, options} from './lib/utils';
import {getTestPointStream} from "./lib/get-stream";

process.on('uncaughtException', function (e) {
  log.error(`<suman-r> has captured an 'uncaughtException' => \n ${su.getCleanErrorString(e)}`);
});

process.on('unhandledRejection', function (e) {
  log.error(`<suman-r> has captured an 'unhandledRejection' => \n ${su.getCleanErrorString(e)}`);
});

process.once('exit', function () {
  console.log('\n');
  log.info(' ---- suman-r end ----');
});

let opts, reporter: string, parser = dashdash.createParser({options});

try {
  opts = parser.parse(process.argv);
} catch (e) {
  log.error(' => suman-r CLI parsing error: %s', e.message);
  process.exit(1);
}

registerReporter(opts.reporter || 'suman-reporters/modules/std-reporter');

const to = setTimeout(function () {
  log.error(chalk.red('no input to suman-r stdin after 35 seconds, shutting down.'));
  process.exit(1);
}, 35000);

let clearStdinTimeout = function () {
  clearTimeout(to);
};

{

  // here we run the testpoint data stream

  let d = Domain.create();

  d.on('error', function (e) {
    log.error(su.getCleanErrorString(e));
  });

  d.run(function () {

    // we use a domain because nothing else seemed to capture the errors properly
    process.stdin.resume().pipe(getTestPointStream())
    .once('data', clearStdinTimeout)
    .on('error', function (e: any) {
      log.error(su.getCleanErrorString(e));
    });

  });
}

{

  // here we run the stream for other data besides testpoint data

  let d = Domain.create();

  d.on('error', function (e) {
    log.error(su.getCleanErrorString(e));
  });

  d.run(function () {

    // we use a domain because nothing else seemed to capture the errors properly
    process.stdin.resume().pipe(getTestPointStream())
    .once('data', clearStdinTimeout)
    .on('error', function (e: any) {
      log.error(su.getCleanErrorString(e));
    });

  });

}






