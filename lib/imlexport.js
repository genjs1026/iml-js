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
var ImlExport = (function() {
  function ImlExport() {
  };
  /**
   * Convert IML to Javascript object.
   * @param IML content
   * @returns Javascript object
   */
  ImlExport.prototype.js2iml = function (data, lineIndent) {
    if(data == null) {
      return "";
    }
    if(lineIndent == null) {
      lineIndent = "  ";
    }
    var lines = [];

    this.js2imlRec(lines, data, lineIndent, -1);

    var out = "";
    for(var i=0; i<lines.length; i++) {
      if(i>0) {
        out += "\n";
      }
      out += lines[i];
    }
    return out;
  };
  ImlExport.prototype.js2imlRec = function (lines, data, lineIndent, indent) {
    if(data == null) {
      return;
    }
    if(  typeof data === 'string' || data instanceof String
      || typeof data === 'number' || data instanceof Number
      || typeof data === 'boolean' || data instanceof Boolean)
    {
      indent++;
      var line = this.indentation(indent, lineIndent);
      line += data;
      lines.push(line);
    }
    else
    if(typeof data === 'date' || data instanceof Date) {
      indent++;
      var line = this.indentation(indent, lineIndent);
      line += data.getTime();
      lines.push(line);
    }
    else
    if(data instanceof Array) {
      indent++;
      var line = this.indentation(indent, lineIndent);
      line += "-";
      lines.push(line);
      for(var i=0; i<data.length; i++) {
        this.js2imlRec(lines, data[i], "  ", indent);
      }
    } else {
      indent++;
      for(var key in data) {
        var line = this.indentation(indent, lineIndent);
        line += key;
        lines.push(line);
        this.js2imlRec(lines, data[key], "  ", indent);
      }
    }
  };
  ImlExport.prototype.indentation = function (indent, lineIndent) {
    var out = "";
    for(var i=0; i<indent; i++) {
      out += lineIndent;
    }
    return out;
  };
  return ImlExport;
})();

module.exports = ImlExport;
