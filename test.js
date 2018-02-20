var generate = require("bit-docs-generate-html/generate");
var Q = require("q");
var path = require("path");
var assert = require("assert");

var Browser = require("zombie");
var connect = require("connect");

var open = function(url, callback, done) {
	var server = connect().use(connect.static(path.join(__dirname))).listen(8081);
	var browser = new Browser();

	browser.visit("http://localhost:8081/" + url)
		.then(function() {
			callback(browser, function() {
				server.close();
			});
		})
		.catch(function(e) {
			server.close();
			done(e);
		})
	;
};

describe("bit-docs-prettify", function() {
	it("basics work", function(done) {
		this.timeout(30000);

		var docMap = Q({
			index: {
				name: "index",
				body: "```javascript\nvar str = 'hello world';\n```\n\n```css\nbody {\n  margin: 0;\n  background: purple;\n}\n```\n\n```shell\npwd\n```\n\n```\n// some misc code\n```"
			}
		});

		generate(docMap, {
			html: {
				dependencies: {
					"bit-docs-prettify": __dirname
				}
			},
			dest: path.join(__dirname, "temp"),
			parent: "index",
			forceBuild: true
		})
			.then(function() {
				open("temp/index.html", function(browser, close) {
					var codes = browser.window.document.getElementsByTagName("code");

					for (var i = 0; i < codes.length; i++) {
						assert.ok(codes[i].className.includes("language-"), "has a language");

						if (codes[i].parentNode.nodeName === "pre") {
							assert.ok(codes[i].parentNode.className.includes("language-"), "parent has a language");
						}
					}

					close();
					done();
				}, done);
			})
			.catch(function(err) {
				console.log("err", err.stack);
				done(err);
			})
		;
	});
});
