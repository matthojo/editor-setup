'use strict';

var inquirer = require('inquirer'),
    chalk = require('chalk'),

    ok = chalk.green,
    error = chalk.bold.red,

    atom = require('./scripts/atom'),
    sublime = require('./scripts/sublime'),
    globals = require('./scripts/global')

inquirer.prompt([
  {
    type: 'list',
    name: 'editor',
    message: 'What Editor do you use?',
    choices: [
      'Atom',
      'Sublime Text'
    ]
  }
, {
    type: 'confirm'
  , name: 'global'
  , message: 'Do you need global setup files?'
  }
  ]
, function( answers ) {
    init(answers)
  })

function init(answers) {
  runAppScripts(answers, function(){
    if (answers.global) {
      globals.init()
    }
  })
}

function runAppScripts(options, cb) {
  switch (options.editor) {
    case 'Atom':
      atom.init()
      break;
    case 'Sublime Text':
      sublime.init()
      break;
    default:
      console.log(error('No editor set'))
  }
  cb()
}
