(function() {
  var CliCommand, execute, fs, util;

  util = require('./util');

  CliCommand = require('./cli-command');

  execute = require('./runner').execute;

  fs = require('fs-extra');

  exports.init = function(path, options, callback) {
    var cb, command, _ref;
    _ref = util.setOptions(options, callback), options = _ref[0], callback = _ref[1];
    fs.ensureDirSync(path);
    command = new CliCommand(['git', 'init'], path, options);
    cb = util.wrapCallback(callback, ((function(_this) {
      return function() {
        return new _this("" + path + "/.git");
      };
    })(this)));
    return execute(command, {}, cb);
  };

  exports.clone = function(url, path, options, callback) {
    var cb, command, _ref;
    _ref = util.setOptions(options, callback), options = _ref[0], callback = _ref[1];
    command = new CliCommand(['git', 'clone'], [url, path], options);
    cb = util.wrapCallback(callback, ((function(_this) {
      return function() {
        return new _this("" + path + "/.git");
      };
    })(this)));
    return execute(command, {}, cb);
  };

}).call(this);