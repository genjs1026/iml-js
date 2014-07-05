var iml = require('./lib/iml');
var fs = require('fs');
var path = require('path');

var data = "Hello";

var imlContent = iml.js2iml(data);
var filename = "data2.iml";
fs.writeFileSync(path.join(process.cwd(), filename), imlContent, 'utf8');