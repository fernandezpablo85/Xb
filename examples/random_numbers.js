Xb.do(function (backoff) {
  var oneToTen = Math.floor(Math.random() * 11);

  if (oneToTen === 7 || oneToTen === 3) {
    console.log('lucky number found');
    backoff.reset();
  } else {
    console.log(oneToTen);
  }

});