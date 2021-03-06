/* 
* Node http client polling example. (requires node.js)
*
* Explanation:
*
*   Poll the page 'http://isitchristmas.com' to see if it is Christmas already.
*
*   Parse the html response to check the answer, and reset the policy if the answer
*   is positive.
*/

var http = require('http')
var Xb = require('xb')

var options = {
  host: 'isitchristmas.com',
  port: 80,
  path: '/'
};

function checkChristmas(backoff) {
  http.get(options, function(res) {
    res.on('data', function(data) {
      var html = data.toString();

      // exctract the answer
      var christmas = html.match(/id="answer">\s*(\S*)\s*<\/a>/)[1];

      // If it's not Christmas, we apply the backoff policy.
      if (christmas === "NO") {
        console.log("Not Christmas yet, will check in a while");
      } else {
        console.log("Merry Christmas!");

        // reset the backoff policy.
        backoff.reset();
      }

    });
  });
}

Xb.do(checkChristmas);
