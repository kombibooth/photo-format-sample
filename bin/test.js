#!/usr/bin/env node
// enables ES6 support
require('babel/register');
var testing = require('../src/');
testing.generate([
    '/home/krolow/Projects/Startup/kombibooth/photo-format-test/test.jpg',
    '/home/krolow/Projects/Startup/kombibooth/photo-format-test/test2.jpg',
    '/home/krolow/Projects/Startup/kombibooth/photo-format-test/test3.jpg'
  ])
  .then(function (o) {
    console.log(o);
  })
  .catch(function (e) {
    console.error(e);
  });
