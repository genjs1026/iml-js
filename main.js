var iml = require('./lib/iml');
var fs = require('fs');
var path = require('path');

var filename = "sample.iml";

var content = fs.readFileSync(path.join(process.cwd(), filename), 'utf8');
console.log(content);

var output = iml.iml2js(content);
console.log("output:");
console.log(output);

