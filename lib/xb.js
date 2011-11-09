(function (undefined) {
  var that = {};

  var Timer = (function () {
    var that = {};
    var timeouts = {};
    var config = { 'min' : 2 , 'max' : 10000 , 'unit' : 'millis' };

    that.exists = function (id) { return !!timeouts[id]; };

    that.init = function (id) { return timeouts[id] = config.min; }; that.reset = that.init;

    that.end = function (id) { timeouts[id] = false; };

    that.setConfig = function (name, value) { config[name] = value; };

    that.increase = function (id) {
      var actual = timeouts[id];
      var unit = config.unit.toLowerCase(), unitValue = 0;
      if (unit === 'millis' || unit === 'milliseconds') {
        unitValue = 1;
      } else if (unit === 'secs' || unit === 'seconds') {
        unitValue = 1000;
      } else {
        throw "unit must be either 'seconds' or 'milliseconds', '" + unit + "' is not a valid unit value";
      }
      return timeouts[id] = (Math.min(config.max, actual * 2) * unitValue);
    };

    return that;
  })();

  function uid () {
    return (+new Date()).toString() + '-' + Math.random().toString().substring(2)
  };

  that.do = function (callback) {
    var id = uid();
    var timeout = Timer.init(id);
    var backoff = {
       reset : function () { Timer.reset(id); }
    };

    var _do = function () {

      // return if timeout was killed.
      if (!Timer.exists(id)) return;

      setTimeout(function(){
        callback(backoff);
        timeout = Timer.increase(id);
        _do();
      }, timeout);

    };
    setTimeout(_do, 0);
    return id;
  };

  that.kill = function (id) {
    Timer.end(id);
  };

  that.reset = function (id) {
    Timer.reset(id);
  };

  that.init = function (config) {
    for (key in config) {
      Timer.setConfig(key, config[key]);
    }
  };

  if (typeof module !== "undefined" && typeof require !== "undefined") {
    module.exports = that; // We're on node.js
  } else {
    window.Xb = that; // We're on the browser
  }
})();