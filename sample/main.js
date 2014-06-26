var iml = require('iml');
var fs = require('fs');
var path = require('path');

var filename = "data.iml";
var fileContent = fs.readFileSync(path.join(process.cwd(), filename), 'utf8');

var data = iml.iml2js(fileContent);

console.log(data);