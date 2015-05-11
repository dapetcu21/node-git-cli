(function() {
  var CliCommand, Repository, S, errors, execute, fs, gitUtil, path, util, _;

  fs = require('fs-extra');

  S = require('string');

  _ = require('underscore');

  path = require('path');

  errors = require('./errors');

  CliCommand = require('./cli-command');

  execute = require('./runner').execute;

  util = require('./util');

  gitUtil = require('./git-util');

  Repository = (function() {
    var BAD_PATH_MSG;

    BAD_PATH_MSG = "repository path should point .git directory";

    function Repository(path) {
      this.path = path;
      if (!S(this.path).endsWith('.git')) {
        throw new errors.BadRepositoryError(BAD_PATH_MSG);
      }
    }

    Repository.prototype.workingDir = function() {
      return path.dirname(this.path);
    };

    Repository.prototype._getOptions = function() {
      return {
        cwd: this.workingDir()
      };
    };

    return Repository;

  })();

  _.each(require('./repo-class-methods'), function(method, key) {
    return Repository[key] = method;
  });

  _.each(['stats', 'remote', 'branch', 'remote-actions', 'index-actions'], function(module) {
    return _.each(require("./" + module), function(method, key) {
      return Repository.prototype[key] = method;
    });
  });

  module.exports = Repository;

}).call(this);