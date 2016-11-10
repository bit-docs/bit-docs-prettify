require("./prettify-engine");
require("./prettify.less")

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
