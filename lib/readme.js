var fs = require('fs')
  , resolve = require('path').resolve

module.exports = function readReadme (cb) {
  var readme = resolve(process.cwd(), './README.md');
  fs.exists(readme, function (yes) {
    if (yes) {
      fs.readFile(readme, 'utf8', function (err, text) {
        if (err) return cb(err);
        var matches = text.match(/^([\w\-]+)\r?\n=+(?:\r?\n){2}(.*?)(?:\r?\n|$)/);
        cb(null, {
          name: matches && matches[1] !== '' ? matches[1] : null,
          description: matches && matches[2] !== '' ? matches[2] : null
        });
      });
    }
    else {
      cb(null, {});
    }
  });
};