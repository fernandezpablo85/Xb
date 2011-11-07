/*
* Random numbers example.
*
* Explanation:
*
*   Generate a random number from 1 to 10. If the number is 7 (lucky number) then
*   we reset the backoff (it starts again from the minimum interval).
*
*   If we get anything different from 7, the backoff policy applies.
*/

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