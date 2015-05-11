(function() {
  var S, util, _;

  _ = require('underscore');

  S = require('string');

  util = {
    hasType: function(object, type) {
      return object.constructor.name === type.name;
    },
    checkArgs: function(object, allowedTypes) {
      var allowedTypesString, type, valid, _i, _len;
      if (!_.isArray(allowedTypes)) {
        allowedTypes = [allowedTypes];
      }
      valid = false;
      for (_i = 0, _len = allowedTypes.length; _i < _len; _i++) {
        type = allowedTypes[_i];
        if (valid = this.hasType(object, type)) {
          break;
        }
      }
      if (!valid) {
        allowedTypesString = _.map(allowedTypes, function(t) {
          return t.name;
        }).join(', ');
        throw new TypeError("expected " + allowedTypesString + " but got " + object.constructor.name);
      }
      return true;
    },
    escape: function(s, chars, escapeChar) {
      var regexp;
      if (chars == null) {
        chars = ['"', "'"];
      }
      if (escapeChar == null) {
        escapeChar = "\\";
      }
      regexp = new RegExp("([" + (chars.join('')) + "])", 'g');
      return s.replace(regexp, "" + escapeChar + "$1");
    },
    quote: function(value, escape) {
      if (escape == null) {
        escape = false;
      }
      if (escape) {
        value = value.replace(/"/g, "\\\"");
      }
      return "\"" + value + "\"";
    },
    quoteAll: function(values, escape) {
      if (escape == null) {
        escape = false;
      }
      return _.map(values, (function(_this) {
        return function(value) {
          return _this.quote(value, escape);
        };
      })(this));
    },
    setOptions: function(options, callback) {
      if (_.isFunction(options) && (callback == null)) {
        return [{}, options];
      } else {
        return [options, callback != null ? callback : null];
      }
    },
    wrapCallback: function(callback, handler) {
      var done;
      if (callback == null) {
        return;
      }
      done = callback;
      return function(err, stdout, stderr) {
        var args;
        args = handler(err, stdout, stderr);
        return done(err, args);
      };
    }
  };

  module.exports = util;

}).call(this);