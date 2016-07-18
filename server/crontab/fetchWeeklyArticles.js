var news = require('../apiModels/news');
var Article = require('../apiModels/articles');

// make Date format be NYT friendly
Date.prototype.yyyymmdd = function() {
  var mm = ("0" + (this.getMonth() + 1)).slice(-2);
  var dd = (	"0" + this.getDate()).slice(-2);
  return [this.getFullYear(), mm, dd].join('');
};

var today = new Date();
var last_week = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));

console.log('date range', last_week, today);

//call to NYT api ->
setInterval(function(){
  for (var count = 0; count < 100; count+= 5) {
    news.getFifty(last_week, today, count);
  }
}, 3000);

setTimeout(Article.cleanUp, 6500);
setTimeout(process.exit, 7000);