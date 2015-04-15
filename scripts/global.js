var shell = require('shelljs'),
    deasync = require('deasync'),
    inquirer = require('inquirer'),
    chalk = require('chalk'),

    ok = chalk.green,
    info = chalk.blue,
    error = chalk.bold.red,

    config = require('../configs/global.json')

exports.init = function() {
  // Install packages
  console.log(ok('Running Global Installs..'))
  var optionalDone
  for (var item in config.packages) {
    var pkg = config.packages[item]
    optionalDone = false

    // Ask if package is optional
    if (pkg.optional) {
      inquirer.prompt([{
        type: 'confirm'
      , name: 'optional'
      , message: chalk.bold.magenta('Install Optional:', chalk.reset.white(pkg.name))
      }]
      , function( answers ) {
          if (answers.optional) {
            install(pkg)
          } else {
            console.log(chalk.bold.blue('Skipping:', chalk.reset.white(pkg.name)))
          }
          optionalDone = true
        })
      while(!optionalDone) {
        require('deasync').runLoopOnce()
      }
    } else {
      install(pkg)
    }
  }
}

function install(pkg) {
  var homeDir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
  console.log(info('Writing ' + pkg.name + ' to ' + homeDir + pkg.installDir + pkg.name))
  shell.cat(__dirname + '/../configs/dotfiles/' + pkg.name).to(homeDir + pkg.installDir + pkg.name)
}
