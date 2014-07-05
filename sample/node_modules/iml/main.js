var iml = require('./lib/iml');
var fs = require('fs');
var path = require('path');

var data = {
  n1: {n11: "n111", n12: "n112"},
  n2: null,
  n3: null
};

var out = iml.js2iml(data);
console.log(out);

/*
var filename = "sample.iml";

var content = fs.readFileSync(path.join(process.cwd(), filename), 'utf8');
console.log(content);

var output = iml.iml2js(content);
console.log("output:");
console.log(output);
*/
