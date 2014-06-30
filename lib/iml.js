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
var ImlParser = require('./imlparser.js');

/**
 * IML Javascript Parser.
 */
var Iml = (function() {
  function Main() {
  };
  /**
   * Convert IML to Javascript object.
   * @param IML content
   * @returns Javascript object
   */
  Main.prototype.iml2js = function (content) {
    var imlParser = new ImlParser();
    return imlParser.iml2js(content);
  };
  return Main;
})();

module.exports = new Iml();
