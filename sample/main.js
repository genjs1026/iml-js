var iml = require('iml');
var fs = require('fs');
var path = require('path');

// Read
var filename = "data.iml";
var fileContent = fs.readFileSync(path.join(process.cwd(), filename), 'utf8');
var data = iml.iml2js(fileContent);
console.log(data);

// Write
var imlContent = iml.js2iml(data);
var filename = "data2.iml";
fs.writeFileSync(path.join(process.cwd(), filename), imlContent, 'utf8');