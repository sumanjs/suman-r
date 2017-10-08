import chalk = require('chalk');

export const info = console.log.bind(console, ' [suman-r] ');
export const error = console.log.bind(console, chalk.red.bold(' [suman-r] '));
export const warning = console.log.bind(console, chalk.yellow.bold(' [suman-r] '));
export const good = console.log.bind(console, chalk.cyan.bold(' [suman-r] '));
export const veryGood = console.log.bind(console, chalk.green.bold(' [suman-r] '));

const $exports = module.exports;
export default $exports;
