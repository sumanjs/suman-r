#!/usr/bin/env node

import su from 'suman-utils';

process.on('uncaughtException', function (e) {
  console.error(`<suman-r> has captured an 'uncaughtException' => \n ${su.getCleanErrorString(e)}`);
});

process.on('unhandledRejection', function (e) {
  console.error(`<suman-r> has captured an 'unhandledRejection' => \n ${su.getCleanErrorString(e)}`);
});

process.once('exit', function () {
  console.log('\n');
  console.log(' ---- suman-r end ----');
});

import chalk = require('chalk');
import dashdash = require('dashdash');
import {getStream} from "./lib/get-stream";
import {registerReporter} from './lib/register-reporter';
import {options} from './lib/suman-r-options';
import Domain = require('domain');

let opts, reporter: string, parser = dashdash.createParser({options});

try {
  opts = parser.parse(process.argv);
} catch (e) {
  console.error(' => suman-r CLI parsing error: %s', e.message);
  process.exit(1);
}

reporter = opts.reporter || 'std-reporter';

registerReporter(reporter);

const d = Domain.create();

d.on('error', function (e) {
  console.log(su.getCleanErrorString(e));
});

const to = setTimeout(function () {
  console.error(chalk.red('no input to suman-r stdin after 10 seconds, shutting down.'));
  process.exit(1);
}, 5000);

let clearStdinTimeout = function () {
  clearTimeout(to);
};

d.run(function () {
  // we use a domain because nothing else seemed to capture the errors properly
  process.stdin.resume().pipe(getStream('zoom'))
  .once('data', clearStdinTimeout)
  .on('error', function (e: any) {
    console.log(su.getCleanErrorString(e));
  });
});


