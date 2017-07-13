require("./prettify-engine");
require("./prettify.less")

/**
 * @parent bit-docs-prettify/static
 * @module {function} bit-docs-prettify/prettify.js
 * 
 * Main front end JavaScript file for static portion of this plugin.
 * 
 * @signature `prettyPrint()`
 * 
 * Finds all `<code>` elements on the page and adds the `prettyprint` class
 * before executing the required pretty print engine.
 * 
 * Also requires [bit-docs-prettify/prettify.less].
 */
module.exports = function(){
    var codes = document.getElementsByTagName("code");
    for(var i = 0; i < codes.length; i ++){
        var code = codes[i];
        if(code.parentNode.nodeName.toUpperCase() === "PRE"){
            code.className = code.className +" prettyprint";
        }
    }
    //turn off batching (https://github.com/google/code-prettify/blob/master/src/prettify.js#L142)
    window.PR_SHOULD_USE_CONTINUATION = false;
    prettyPrint();
}
