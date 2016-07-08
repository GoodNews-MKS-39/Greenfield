var db = require('../db');

var Article = module.exports;

Article.all = function () {
  return db.collection('articles').find({});
};

Article.allIds = function () {
  return db.collection('articles').find({}, {_id: 1});
};

Article.findByDate = function (startDate, endDate) {
  return db.collection('articles').find({
    pubDate: {
      $gte: ISODate(startDate),
      $lt: ISODate(endDate)
    }
  });
};

Article.create = function (incomingArticles) {
  // Copy to avoid mutation
  var attrs = Object.assign({}, incomingArticles);
  var existingArticles = [];

  console.log("about to send to DB");

  Article.allIds().then(function(rows){
    existingArticles = rows.map(function(row){
      return row._id;
    });
    insert();
  });

  function insert() {
    for (article of incomingArticles) {
      if (existingArticles.indexOf(article._id) < 0) {
        db.collection('articles').insert(article);
      }
    }
  }

  console.log("all done sending to DB");
};
