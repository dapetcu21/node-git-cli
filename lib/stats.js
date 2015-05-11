(function() {
  var CliCommand, execute, gitUtil, util, _;

  _ = require('underscore');

  gitUtil = require('./git-util');

  execute = require('./runner').execute;

  util = require('./util');

  CliCommand = require('./cli-command');

  exports.diff = function(options, callback) {
    var args, command, _ref;
    _ref = util.setOptions(options, callback), options = _ref[0], callback = _ref[1];
    args = this._getDiffArgs(options);
    command = new CliCommand(['git', 'diff'], args, options);
    return execute(command, this._getOptions(), callback);
  };

  exports.diffStats = function(options, callback) {
    var args, cb, cliOpts, command, _ref;
    _ref = util.setOptions(options, callback), options = _ref[0], callback = _ref[1];
    args = this._getDiffArgs(options);
    cliOpts = _.extend({
      shortstat: ''
    }, options);
    command = new CliCommand(['git', 'diff'], args, cliOpts);
    cb = util.wrapCallback(callback, function(err, stdout) {
      return gitUtil.parseShortDiff(stdout);
    });
    return execute(command, this._getOptions(), cb);
  };

  exports._getDiffArgs = function(options) {
    var args;
    args = [];
    if (options.source != null) {
      args.push(options.source);
    }
    if (options.target != null) {
      args.push(options.target);
    }
    if (options.path != null) {
      args.push('--');
      Array.prototype.push.apply(args, options.paths);
    }
    return args;
  };

  exports.status = function(options, callback) {
    var cb, command, _ref;
    _ref = util.setOptions(options, callback), options = _ref[0], callback = _ref[1];
    command = new CliCommand(['git', 'status'], _.extend({
      s: ''
    }, options));
    cb = util.wrapCallback(callback, (function(_this) {
      return function(err, stdout) {
        var statusInfo;
        statusInfo = gitUtil.parseStatus(stdout);
        return _.each(statusInfo, function(f) {
          return f.fullPath = "" + (_this.workingDir()) + "/" + f.path;
        });
      };
    })(this));
    return execute(command, this._getOptions(), cb);
  };

  exports.log = function(options) {
    var callback, cb, cliOpts, command, format, _ref;
    if (options == null) {
      options = {};
    }
    _ref = util.setOptions(options, callback), options = _ref[0], callback = _ref[1];
    format = '{"author": "%an", "email": "%ae", "date": "%cd", "subject": "%s", "body": "%b", "hash": "%H"},';
    cliOpts = _.extend({
      pretty: "format:" + format
    }, options);
    command = new CliCommand(['git', 'log'], cliOpts);
    cb = util.wrapCallback(callback, function(err, stdout) {
      return gitUtil.parseLog(stdout);
    });
    return execute(command, this._getOptions(), cb);
  };

}).call(this);