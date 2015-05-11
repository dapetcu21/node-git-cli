(function() {
  var CliCommand, execute, util, _;

  _ = require('underscore');

  util = require('./util');

  CliCommand = require('./cli-command');

  execute = require('./runner').execute;

  exports.push = function(args, options, callback) {
    var command, _ref, _ref1, _ref2;
    if (_.isString(args)) {
      args = [args];
    }
    if (_.isArray(args)) {
      _ref = util.setOptions(options, callback), options = _ref[0], callback = _ref[1];
    } else {
      _ref1 = [util.setOptions(args, options), []], (_ref2 = _ref1[0], options = _ref2[0], callback = _ref2[1]), args = _ref1[1];
    }
    command = new CliCommand(['git', 'push'], args, options);
    return execute(command, this._getOptions(), callback);
  };

}).call(this);
