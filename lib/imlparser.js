/*
 Copyright Ludovic Chaboud

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * IML Javascript Parser.
 */
var ImlParser = (function() {
  function ImlParser() {
  };
  /**
   * Convert IML to Javascript object.
   * @param IML content
   * @returns Javascript object
   */
  ImlParser.prototype.iml2js = function (content) {
    var lineEnd = "";
    if(content.indexOf("\r\n") != -1) {
      lineEnd = "\r\n";
    } else if(content.indexOf("\r") != -1) {
      lineEnd = "\r";
    } else {
      lineEnd = "\n";
    }
    var modeEnabled_isolatedLeafBecomeString = true;
    var lines = content.split(lineEnd);
    var data = {};
    var stackIndent = [0]
    var stackData = [data];
    var stackName = [];
    var stackIsList = [false];
    var stackIsObject = [false];
    var isFirst = true;
    var blockType = null;
    var blockIndent = null;
    var blockValue = null;
    var isLastLine = false;
    for(var i=0; i<=lines.length; i++) {
      if(i==lines.length) {
        isLastLine = true;
        var line = "";
      } else {
        var line = lines[i];
      }

      if(line.indexOf("\t") != -1) {
        line = this.lineWithoutTab(line);
      }

      var indent = 0;
      while (indent < line.length && line[indent] == ' ') {
        indent++;
      }

      var lineContent = line.substring(indent);
      if(!isLastLine) {
        if (lineContent == null || lineContent.trim() == "") {
          continue;
        }
      }
      // first char
      var firstChar = null;
      if (indent < line.length) {
        firstChar = line[indent];
      }
      // console.log("indent:"+indent+" char:"+firstChar+" lineContent:"+lineContent);
      if(blockType != null) {
        if(indent <= blockIndent) {
          if(blockType == 'string') {
            if (stackData.length > 1) {
              var isList = stackIsList[stackIsList.length - 1];
              if(isList) {
                var parent = stackData[stackData.length - 1];
                parent.push(blockValue);
              } else {
                var isList = stackIsList[stackIsList.length - 2];
                if(isList) {
                  var parent = stackData[stackData.length - 2];
                  var name = stackName[stackName.length - 1];
                  parent[parent.length - 1][name] = blockValue;
                } else {
                  var parent = stackData[stackData.length - 2];
                  if(parent == null) {
                    parent = {};
                    stackData[stackData.length - 2] = parent;
                    stackData[stackData.length - 3][stackName[stackName.length - 2]] = parent;
                  }
                  var name = stackName[stackName.length - 1];
                  parent[name] = blockValue;
                }
              }
            }
          }
          blockType = null;
          blockIndent = null;
          blockValue = null;
        } else {
          if (blockType == 'string') {
            blockValue += lineEnd + lineContent;
          }
        }
      }
      if(blockType == null) {
        if(lineContent == '#') {
          blockType = 'comment';
          blockIndent = indent;
        }
        else
        if(lineContent == '*') {
          var isList = stackIsList[stackIsList.length - 1];
          if(!isList) {
            if(stackData[stackData.length - 1] == null) {
              var child = new Object();
              stackData[stackData.length - 1] = child;
              stackIndent[stackIndent.length - 1] = indent;
              stackData[stackData.length - 2][stackName[stackName.length - 1]] = child;
            } else {
              stackIndent[stackIndent.length - 1] = indent;
            }
            stackIsObject[stackIsObject.length - 1] = true;
          } else {
            var child = new Object();
            var parent = stackData[stackData.length - 1];
            parent.push(child);
            stackData.push(child);
            stackIsList.push(false);
            stackIsObject.push(true);
            stackIndent.push(indent);
            stackName.push('0');
          }
        }
        else
        if(lineContent == '-') {
          var isList = stackIsList[stackIsList.length - 1];
          var child = new Array();
          if(!isList) {
            if(stackData.length == 1) {
              stackData[stackData.length - 1] = child;
              stackIsList[stackIsList.length - 1] = true;
              stackIndent[stackIndent.length - 1] = indent;
            } else {
              var parent = stackData[stackData.length - 2];
              var name = stackName[stackName.length - 1];
              parent[name] = child;
              stackData[stackData.length - 1] = child;
              stackIsList[stackIsList.length - 1] = true;
              stackIndent[stackIndent.length - 1] = indent;
            }
          } else {
            var parent = stackData[stackData.length - 1];
            parent.push(child);
            stackData.push(child);
            stackIndent.push(indent);
            stackName.push('0');
            stackIsList.push(true);
            stackIsObject.push(false);
          }
        }
        else
        if(firstChar == '>') {
          if (indent <= stackIndent[stackIndent.length - 1]) {
            if(modeEnabled_isolatedLeafBecomeString) {
              if (stackIndent.length > 2) {
                var parent = stackData[stackData.length - 2];
                var name = stackName[stackName.length - 1];
                var value = parent[name];
                if (typeof parent[name] !== 'string'
                  && Object.keys(stackData[stackData.length - 2]).length == 1
                  && stackData[stackData.length - 1] == null
                  && !stackIsObject[stackIsObject.length - 2])
                {
                  if (name != null) {
                    if (stackIsList[stackIsList.length - 3]) {
                      var array = stackData[stackData.length - 3];
                      array[array.length - 1] = name;
                    } else {
                      var key = stackName[stackName.length - 2];
                      stackData[stackData.length - 3][key] = name;
                    }
                  }
                }
              }
            }

            while (indent <= stackIndent[stackIndent.length - 1] && stackIndent.length > 1) {
              delete stackData[stackData.length--];
              delete stackIndent[stackIndent.length--];
              delete stackName[stackName.length--];
              delete stackIsList[stackIsList.length--];
              delete stackIsObject[stackIsObject.length--];
            }
          }
          blockType = 'string';
          blockIndent = indent;
          var posDebut = lineContent.indexOf('>')+1;
          while(lineContent.charAt(posDebut) == ' ') {
            posDebut++;
          }
          blockValue = lineContent.substring(posDebut);
        }
        else
        if (blockType == null) {
          if (indent > stackIndent[stackIndent.length - 1] || isFirst) {
            if (isFirst) {
              isFirst = false;
            }
            if(!isLastLine) {
              var parent = stackData[stackData.length - 1];
              var isList = stackIsList[stackIsList.length - 1];
              if (isList) {
                var child = {};
                child[lineContent] = null;
                parent.push(child);
                stackData.push(child);
                stackIndent.push(indent);
                stackName.push("-");
                stackIsList.push(false);
                stackIsObject.push(false);
                stackData.push(child[lineContent]);
              } else {
                if(parent == null) {
                  parent = {};
                  stackData[stackData.length - 1] = parent;
                  stackData[stackData.length - 2][stackName[stackName.length - 1]] = parent;
                }
                parent[lineContent] = null;
                stackData.push(parent[lineContent]);
              }
              stackIndent.push(indent);
              stackName.push(lineContent);
              stackIsList.push(false);
              stackIsObject.push(false);
            }
          }
          else if (indent == stackIndent[stackIndent.length - 1]) {

            if(modeEnabled_isolatedLeafBecomeString) {
              if (stackIndent.length > 2) {
                var parent = stackData[stackData.length - 3];
                var name = stackName[stackName.length - 1];
                if (typeof parent[name] !== 'string'
                  && Object.keys(stackData[stackData.length - 2]).length == 1
                  && stackData[stackData.length - 1] == null
                  && !stackIsObject[stackIsObject.length - 2])
                {
                  if (name != null) {
                    if (stackIsList[stackIsList.length - 3]) {
                      var array = stackData[stackData.length - 3];
                      array[array.length - 1] = name;
                    } else {
                      if(indent != stackIndent[stackIndent.length - 1]) {
                        var key = stackName[stackName.length - 2];
                        stackData[stackData.length - 3][key] = name;
                      }
                    }
                  }
                }
              }
            }
            if(!isLastLine) {
              var isList = stackIsList[stackIsList.length - 3];
              if (isList) {
                var array = stackData[stackData.length - 3];
                var child = {};
                child[lineContent] = null;
                array.push(child);
                stackData[stackData.length - 2] = child;
                stackIsList[stackData.length - 2] = false;
                stackData[stackData.length - 1] = child[lineContent];
              } else {
                var parent = stackData[stackData.length - 2];
                if(parent == null) {
                  parent = {};
                  stackData[stackData.length - 2] = parent;
                  stackData[stackData.length - 3][stackName[stackName.length - 2]] = parent;
                }
                parent[lineContent] = null;
                stackData[stackData.length - 1] = parent[lineContent];
              }
              stackIndent[stackIndent.length - 1] = indent;
              //stackName[stackName.length - 1] = stackName[stackName.length - 2];
              stackName[stackName.length - 1] = lineContent;
              stackIsList[stackIsList.length - 1] = false;
            }
          }
          else if (indent < stackIndent[stackIndent.length - 1]) {

            if(modeEnabled_isolatedLeafBecomeString) {
              if (stackIndent.length > 2) {
                var parent = stackData[stackData.length - 2];
                var name = stackName[stackName.length - 1];
                var value = parent[name];
                if (typeof parent[name] !== 'string'
                  && Object.keys(stackData[stackData.length - 2]).length == 1
                  && stackData[stackData.length - 1] == null
                  && !stackIsObject[stackIsObject.length - 2])
                {
                  if (name != null) {
                    if (stackIsList[stackIsList.length - 3]) {
                      var array = stackData[stackData.length - 3];
                      array[array.length - 1] = name;
                    } else {
                      var key = stackName[stackName.length - 2];
                      stackData[stackData.length - 3][key] = name;
                    }
                  }
                }
              }
            }

            while (indent <= stackIndent[stackIndent.length - 1] && stackIndent.length > 1) {
              delete stackData[stackData.length--];
              delete stackIndent[stackIndent.length--];
              delete stackName[stackName.length--];
              delete stackIsList[stackIsList.length--];
              delete stackIsObject[stackIsObject.length--];
            }
            if(!isLastLine) {
              var parent = stackData[stackData.length - 1];
              var isList = stackIsList[stackIsList.length - 1];
              if (isList) {
                var child = {};
                child[lineContent] = null;
                parent.push(child);
                stackData.push(child);
                stackIndent.push(indent);
                stackName.push("-");
                stackIsList.push(false);
                stackIsObject.push(false);
                stackData.push(child[lineContent]);
              } else {
                if(parent == null) {
                  parent = {};
                  stackData[stackData.length - 1] = parent;
                  stackData[stackData.length - 2][stackName[stackName.length - 1]] = parent;
                }
                parent[lineContent] = null;
                stackData.push(parent[lineContent]);
              }
              stackIndent.push(indent);
              stackName.push(lineContent);
              stackIsList.push(false);
              stackIsObject.push(false);
            }
          }
        }
      }
      lineContentAfter = lineContent;
    }
    out = stackData[0];
    return out;
  };
  ImlParser.prototype.lineWithoutTab = function(line) {
    var indent = 0;
    var indentWithTab = 0;
    var lineWithoutTab = "";
    while (indent < line.length && ( line[indent] == ' ' || line[indent] == '\t' )) {
      if( line[indent] == ' ') {
        lineWithoutTab += ' ';
        indentWithTab++;
      }
      if(line[indent] == '\t') {
        var sup = 4 - indentWithTab % 4;
        indentWithTab += sup;
        for(var i=0; i<sup; i++) {
          lineWithoutTab += ' ';
        }
      }
      indent++;
    }
    lineWithoutTab += line.substring(indent);
    return lineWithoutTab;
  };
  return ImlParser;
})();

module.exports = ImlParser;
