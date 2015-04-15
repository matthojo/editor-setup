var shell = require('shelljs/global'),
    chalk = require('chalk'),

    ok = chalk.green,
    error = chalk.bold.red

exports.init = function() {
  console.log(ok('Running Sublime Text Script'))
}
