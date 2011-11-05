var Xb = (function (undefined) {
  var that = {};
  var _timeouts = {};
  var _config = { 'min' : 2 , 'max' : 10000 , 'unit' : 'millis' };

  function uid () {
    return (+new Date()).toString() + '-' + Math.random().toString().substring(2)
  };

  function timeoutFor (id) {
    var timeout = _timeouts[id];
    var unit = _config.unit.toLowerCase(), unitValue = 0;
    if (unit === 'millis' || unit === 'milliseconds') {
      unitValue = 1;
    } else if (unit === 'secs' || unit === 'seconds') {
      unitValue = 1000;
    } else {
      throw "unit must be either 'seconds' or 'milliseconds', '" + unit + "' is not a valid unit value";
    }
    return _timeouts[id] = (Math.min(_config.max, timeout * 2) * unitValue);
  };

  that.do = function (callback) {
    var id = uid();
    _timeouts[id] = _config.min;
    var timeout = _timeouts[id];
    var backoff = {
       reset : function () {
         _timeouts[id] = _config.min;
       }
    };
    var _do = function () {

      // return if timeout was killed.
      if (!_timeouts[id]) return;

      setTimeout(function(){
        callback(backoff);
        timeout = timeoutFor(id);
        _do();
      }, timeout);

    };
    setTimeout(_do, 0);
    return id;
  };

  that.kill = function (id) {
    _timeouts[id] = false;
  };

  that.reset = function (id) {
    _timeouts[id] = _config.min;
  };

  that.init = function (config) {
    for (key in config) {
      _config[key] = config[key];
    }
  };

  return that;
})();