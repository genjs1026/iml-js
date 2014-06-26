iml-js : IML Javascript Parser
===
What is IML ?
===

IML means " Indentation Markup Language " because the indentation delimits elements informations area.

The main objective  is to have the most simplified syntax than others in order to describe data easily.
An IML file must be comprehensive and editable by any human.

This syntax permits to describe the same data structure than JSON or YAML, but in a simplified way.

And why not YAML ?
---
The IML syntax is similar to YAML syntax, but IML is more easy to edit with less pitfalls :
 - we have not to add ```:``` at the end of each map keys
 - we have not to add a tiret ```-``` before each element of a list : only one line with a tiret ```-``` at the beginning of the list indicates that all children elements are in this list
 - multilines are easy to define with ```>``` symbol before the first line with no break line after it

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

You can see a comparison between IML and YAML and JSON here :
https://github.com/lchaboud/iml/blob/master/SAMPLE.md

Get data from IML
===

Get data from IML string
---
```js
var iml = require('iml');
var data = iml.iml2js("iml content ...");
```

Get data from IML file
---
```js
var iml = require('iml');
var fs = require('fs');
var path = require('path');

var filename = "data.iml";
var fileContent = fs.readFileSync(path.join(process.cwd(), filename), 'utf8');

var data = iml.iml2js(fileContent);

console.log(data);
```

You can get a sample project here :
