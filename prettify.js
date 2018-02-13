require("prismjs/themes/prism-coy.css");
var Prism = require("prismjs");

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
	for (var i = 0; i < codes.length; i++) {
			var code = codes[i];

			if (code.parentNode.nodeName.toUpperCase() === "PRE") {
				if (!code.parentNode.className.includes("language-")) {
					code.parentNode.className += " language-unknown";
				}
			}
			else {
				code.className += " language-unknown";
			}
	}

	Prism.highlightAll();
}
