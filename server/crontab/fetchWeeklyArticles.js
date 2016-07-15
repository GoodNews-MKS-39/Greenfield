var news = require('../apiModels/news');

// make Date format be NYT friendly
Date.prototype.yyyymmdd = function() {
  var mm = ("0" + (this.getMonth() + 1)).slice(-2);
  var dd = (	"0" + this.getDate()).slice(-2);
  return [this.getFullYear(), mm, dd].join('');
};

var date = new Date();
var last_week = new Date(date.getTime() - (7 * 24 * 60 * 60 * 1000));
var end = date.yyyymmdd();
var start = last_week.yyyymmdd();

console.log('date range', start, end);

//call to NYT api ->
setInterval(function(){
  for (var count = 0; count < 70; count+= 5) {
    news.getFifty(start, end, count);
  }
}, 1200);

setTimeout(process.exit, 10000);