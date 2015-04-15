var shell = require('shelljs'),
    deasync = require('deasync'),
    inquirer = require('inquirer'),
    chalk = require('chalk'),

    ok = chalk.green,
    info = chalk.blue,
    error = chalk.bold.red,

    config = require('../configs/atom.json')

exports.init = function() {
  // Check if `apm` exists
  if (!shell.which('apm')) {
    console.log(error('Installing Atom packages requires `apm`, sorry.'))
    shell.exit(1)
  }

  // Install packages
  console.log(ok('Running Atom Package Installs..'))
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
  if(pkg.version) {
    shell.exec('apm install ' + pkg.name + '@' + pkg.version)
  } else {
    shell.exec('apm install ' + pkg.name)
  }
}
