var news = require('../apiModels/news');

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(), !mm[1] && '0', mm, !dd[1] && '0', dd].join(''); // padding
};

var date = new Date();
date = date.yyyymmdd();

console.log('date', date);

news.getArticles(20160708,20160708);
