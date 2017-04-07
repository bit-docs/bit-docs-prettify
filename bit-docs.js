/**
 * @module {function} bit-docs-prettify
 * @parent plugins
 *
 * @description A bit-docs plugin that makes source-code snippets in HTML prettier.
 *
 * @body
 *
 * TBD
 */
module.exports = function(bitDocs){
    var pkg = require("./package.json");
    var dependencies = {};
    dependencies[pkg.name] = pkg.version;

    bitDocs.register("html", {
        dependencies: dependencies
    });
}
