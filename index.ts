#!/usr/bin/env node

import dashdash = require('dashdash');
import {getStream} from "./lib/get-stream";
import {registerReporter} from './lib/register-reporter';
import {options} from './lib/suman-r-options';

let opts, reporter: string, parser = dashdash.createParser({options});

try {
  opts = parser.parse(process.argv);
} catch (e) {
  console.error(' => suman-r CLI parsing error: %s', e.message);
  process.exit(1);
}

reporter = opts.reporter || 'std-reporter';

registerReporter(reporter);

process.stdin.resume().pipe(getStream('zoom'));
