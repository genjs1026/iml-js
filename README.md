iml-js
======

IML - Indentation Markup Language - Javascript Parser
---

Javascript Parser for IML files.

IML syntax is described in the README file of the IML project : 
https://github.com/lchaboud/iml/blob/master/README.md

You can see a complete IML file sample here :
https://github.com/lchaboud/iml/blob/master/SAMPLE.md

IML to Javascript : iml2js
===

Parse iml string content
---
```js
var iml = require('./lib/iml');
var output = iml.iml2js("...iml content to parse...");
```

Parse iml file
---
```js
var liml = require('./lib/liml');
var fs = require('fs');
var path = require('path');

var filename = "model2.sml";
var content = fs.readFileSync(path.join(process.cwd(), filename), 'utf8');

var output = liml.liml2js(content);
```
