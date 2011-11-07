// Check if we're running this with node and require xb
if (typeof require !== "undefined") {
  var Xb = require('xb');
}

Xb.do(function (backoff) {
  var oneToTen = Math.floor(Math.random() * 11);

  if (oneToTen === 7 || oneToTen === 3) {
    console.log('lucky number found');
    backoff.reset();
  } else {
    console.log(oneToTen);
  }

});