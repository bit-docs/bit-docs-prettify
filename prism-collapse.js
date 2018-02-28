(function(){

if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
	return;
}

function hasClass(element, className) {
  className = " " + className + " ";
  return (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1
}

function collapseLines(pre, config) {
	var code = pre.children[0];
	var lines = code.innerHTML.split('\n');
	lines = lines.map(function(line, index) {
		if (index === lines.length - 1) {
			return line;
		}

		return line + '\n';
	});

	var inserts = [];
	var ranges = config.split(',');
	for (var i = 0; i < ranges.length; i++) {
		var parts = ranges[i].split('-');

		inserts.push([ +parts[0], '<div class="collapse collapsed"><div class="collapse-code">' ]);
		inserts.push([ +parts[1], '</div></div>' ]);
	}

	inserts.sort(function (a, b) {
		return b[0] - a[0];
	});

	for (var i = 0; i < inserts.length; i++) {
		var line = inserts[i][0] - 1;
		var content = inserts[i][1];

		lines.splice(line, 0, content);
	}

	code.innerHTML = lines.join('');
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
		collapseLines(pre, config);
	}
});

$('body').on('click', 'pre code .collapse.collapsed', function() {
	$(this).removeClass('collapsed');
});

})();
