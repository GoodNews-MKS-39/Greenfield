var news = require('../apiModels/news');
var Article = require('../apiModels/articles');

var today = new Date();
console.log('today', today);

//call to NYT api ->
setInterval(function() {
  for (var count = 0; count < 100; count+= 5) {
    news.getFifty(today, today, count);
  }
}, 3000);

setTimeout(Article.cleanUp, 6500);
setTimeout(process.exit, 7000);