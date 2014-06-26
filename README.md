iml-js
======

IML - Indentation Markup Language - Javascript Parser
---

What is IML ?
---

IML means Indentation Markup Language because the indentation delimits elements information.

The IML syntax is similar to YAML syntax, but IML is more easy to edit with less pitfalls :
 - we have not to add ```:``` at the end of each map keys
 - there is no ```" "``` to define strings because all values are string by default
 - multilines are easy to define with ```>``` symbol with no break line after it
 - we have not to add a tiret ```-``` before each element of a list : only one line with a tiret ```-``` at the first line indicates that all children elements are in the list

See a sample of IML content :
```
My recipes
  -
    Best Chocolate Chip Cookies
      Ingredients
        -
          1 cup butter
          1 cup white sugar
          1 cup packed bown brown sugar
          2 eggs
          2 teaspoons vanilla extract
          1 teaspoon baking soda
          2 teaspoons hot water
          1/2 teaspoon salt
          2 cups semisweet chocolate
          1 cup chopped walnuts
      Preparation
        -
          > Preheat oven to 350 degrees F (175 degrees C)
          > Cream together the butter, white sugar, and brown sugar until smooth. 
            Beat in the eggs one at a time, then stir in the vanilla. Dissolve 
            baking soda in hot water. Add to batter along with salt. Stir in flour, 
            chocolate chips, and nuts. Drop by large spoonfuls onto ungreased pans.
          > Bake for about 10 minutes in the preheated oven, or until edges are 
            nicely browned.
```

IML syntax is described in the README file of the IML project : 
https://github.com/lchaboud/iml/blob/master/SYNTAX.md

You can see a complete IML file sample here :
https://github.com/lchaboud/iml/blob/master/SAMPLE.md

Get data from IML
===

Get data from IML string content
---
```js
var iml = require('./lib/iml');
var data = iml.iml2js("iml content ...");
```

Get data from IML file
---
```js
var iml = require('./lib/iml');
var fs = require('fs');
var path = require('path');

var filename = "data.iml";
var fileContent = fs.readFileSync(path.join(process.cwd(), filename), 'utf8');

var data = iml.iml2js(fileContent);
```
