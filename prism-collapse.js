(function(){

if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
	return;
}

function hasClass(element, className) {
  className = " " + className + " ";
  return (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1
}

function collapseLines(pre, config, hasLineNumbers) {
	var inserts = [];

	var ranges = config.split(',');
	for (var i = 0; i < ranges.length; i++) {
		var parts = ranges[i].split('-');

		inserts.push([ +parts[0], '<div class="collapse collapsed" data-index="' + i + '"><div class="collapse-code">', '<div class="collapse collapsed" data-index="' + i + '"><div class="collapse-lines">' ]);
		inserts.push([ +parts[1] + 1, '</div></div>', '</div></div>' ]);
	}

	inserts.sort(function (a, b) {
		return b[0] - a[0];
	});


	var codeContainer = pre.children[0];

	var numbersContainer = null;
	var numbers = null;
	if (hasLineNumbers) {
		numbersContainer = codeContainer.lastChild;
		numbersContainer.remove();

		numbers = numbersContainer.innerHTML.split('<span></span>');
	}

	var code = codeContainer.innerHTML.split('\n');
	code = code.map(function(line, index) {
		if (index === code.length - 1) {
			return line;
		}

		return line + '\n';
	});

	for (var i = 0; i < inserts.length; i++) {
		var line = inserts[i][0] - 1;

		code.splice(line, 0, inserts[i][1]);
		numbers[line] += inserts[i][2];
	}

	codeContainer.innerHTML = code.join('');

	if (hasLineNumbers) {
		numbersContainer.innerHTML = numbers.join('<span></span>');
		codeContainer.appendChild(numbersContainer);
	}
}

Prism.hooks.add('complete', function completeHook(env) {
	var pre = env.element.parentNode;
	var config = pre && pre.getAttribute('data-collapse');

	if (!pre || !config || !/pre/i.test(pre.nodeName)) {
		return;
	}

	var hasLineNumbers = Prism.plugins.lineNumbers;
	var isLineNumbersLoaded = env.plugins && env.plugins.lineNumbers;

	if (hasClass(pre, 'line-numbers') && hasLineNumbers && !isLineNumbersLoaded) {
		Prism.hooks.add('line-numbers', completeHook);
	} else {
		collapseLines(pre, config, hasLineNumbers);
	}
});

$('body').on('click', 'pre code .collapse.collapsed', function() {
	var parent = $(this).closest('code');
	var index = $(this).attr('data-index');

	parent
		.find('.collapse[data-index=' + index + ']')
		.removeClass('collapsed')
	;
});

})();
