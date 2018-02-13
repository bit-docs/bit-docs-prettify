require("prismjs");
require("prismjs/plugins/line-numbers/prism-line-numbers.js");
require("prismjs/plugins/previewers/prism-previewers.js");
require("prismjs/plugins/command-line/prism-command-line.js");

require("prismjs/themes/prism-coy.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");
require("prismjs/plugins/previewers/prism-previewers.css");
require("prismjs/plugins/command-line/prism-command-line.css");

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
				code.parentNode.className += " line-numbers";

				if (!code.className.includes("language-")) {
					code.className += " language-unknown";
				}

				if (code.className.includes("language-shell")) {
					code.parentNode.className += " command-line";

					if (code.textContent.slice(-1) === "\n") {
						code.textContent = code.textContent.slice(0, -1);
					}
				}
			}
			else {
				code.className += " language-unknown";
			}
	}
}
