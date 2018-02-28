require("./prettify.less");

var Prism = require("prismjs");
require("prismjs/plugins/line-numbers/prism-line-numbers.js");
require("prismjs/plugins/previewers/prism-previewers.js");
require("prismjs/plugins/command-line/prism-command-line.js");
require("prismjs/plugins/line-highlight/prism-line-highlight.js");
require("prismjs/plugins/toolbar/prism-toolbar.js");
require("prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js");

require("prismjs/themes/prism-coy.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");
require("prismjs/plugins/previewers/prism-previewers.css");
require("prismjs/plugins/command-line/prism-command-line.css");
require("prismjs/plugins/line-highlight/prism-line-highlight.css");
require("prismjs/plugins/toolbar/prism-toolbar.css");

Prism.languages.insertBefore('javascript', 'template-string', {
	'html-template-string': {
		pattern: /`(?:[\s\S])*<[a-z-]+(?:\s+[^<>]*)?>(?:[\s\S])*`/,
		inside: {
			'interpolation': {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			rest: Prism.languages.html
		}
	}
});

Prism.hooks.add('before-highlightall', function (env) {
	var codes = document.getElementsByTagName("code");
	for (var i = 0; i < codes.length; i++) {
		var code = codes[i];

		if (code.textContent.slice(-1) === "\n") {
			code.textContent = code.textContent.slice(0, -1);
		}

		if (code.parentNode.nodeName.toUpperCase() === "PRE") {
			code.parentNode.className += " line-numbers";

			if (!code.className.includes("language-")) {
				code.className += " language-unknown";
			}

			if (code.className.includes("language-shell")) {
				code.parentNode.className += " command-line";
			}
		}
		else {
			if (!code.className.includes("language-")) {
				code.className += " language-unknown";
			}
		}
	}
 });
