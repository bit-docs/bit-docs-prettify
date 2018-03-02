require("./prettify.less");

require("./prism-config");
var Prism = require("prismjs");
require("prismjs/plugins/line-numbers/prism-line-numbers.js");
require("prismjs/plugins/previewers/prism-previewers.js");
require("prismjs/plugins/command-line/prism-command-line.js");
require("prismjs/plugins/line-highlight/prism-line-highlight.js");
require("prismjs/plugins/toolbar/prism-toolbar.js");
require("prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js");
require("./prism-collapse.js");

require("prismjs/themes/prism-coy.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");
require("prismjs/plugins/previewers/prism-previewers.css");
require("prismjs/plugins/command-line/prism-command-line.css");
require("prismjs/plugins/line-highlight/prism-line-highlight.css");
require("prismjs/plugins/toolbar/prism-toolbar.css");
require("./prism-collapse.less");

/**
 * Get node for provided line number
 * Copied from prism-line-numbers.js and modified to support nested spans
 * @param {Element} element pre element
 * @param {Number} number line number
 * @return {Element|undefined}
 */
Prism.plugins.lineNumbers.getLine = function (element, number) {
	if (element.tagName !== 'PRE' || !element.classList.contains('line-numbers')) {
		return;
	}

	var lineNumberRows = element.querySelector('.line-numbers-rows');
	var lineNumberStart = parseInt(element.getAttribute('data-start'), 10) || 1;
	var lineNumberEnd = lineNumberStart + (lineNumberRows.children.length - 1);

	if (number < lineNumberStart) {
		number = lineNumberStart;
	}
	if (number > lineNumberEnd) {
		number = lineNumberEnd;
	}

	var lineIndex = number - lineNumberStart;

	// this line was changed
	return lineNumberRows.querySelectorAll('span')[lineIndex];
};

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

module.exports = function() {
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

	window.requestAnimationFrame(Prism.highlightAll);
};
