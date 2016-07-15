var news = require('../apiModels/news');

// make Date format be NYT friendly
Date.prototype.yyyymmdd = function() {
  var mm = ("0" + (this.getMonth() + 1)).slice(-2);
  var dd = (	"0" + this.getDate()).slice(-2);
  return [this.getFullYear(), mm, dd].join('');
};

var date = new Date();
today = date.yyyymmdd();

console.log('today', today);

//call to NYT api ->
setInterval(function(){
  for (var count = 0; count < 70; count+= 5) {
    news.getFifty(today, today, count);
  }
}, 1200);

setTimeout(process.exit, 10000);