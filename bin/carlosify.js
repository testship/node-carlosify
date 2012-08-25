#!/usr/bin/env node
var hardhat = require('hardhat')
  , async = require('async')
  , path = require('path')
  , readReadme = require('../lib/readme')

var rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

async.series({
  name: function moduleName (cb) {
    var def = path.basename(process.cwd()).replace(/^node\-/, '');
    rl.question('module name: (' + def + ') ', function (answer) {
      cb(null, answer === '' ? def : answer);
    });
  },
  description: function (cb) {
    readReadme(function (err, readme) {
      var def = '';
      if (readme.description) {
        def = '(' + readme.description + ') ';
      }
      rl.question('description: ' + def, function (answer) {
        cb(null, answer === '' ? def : answer);
      });
    });
  },
  something: function (cb) {
    
  }
}, function (err, results) {
  console.log(results);
});
