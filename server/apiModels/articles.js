var db = require('../db');

var Article = module.exports;

Article.all = function () {
  return db.collection('articles').find({});
};

Article.allIds = function () {
  return db.collection('articles').find({}, {id: 1});
};

Article.findByDate = function (startDate, endDate) {
  return db.collection('articles').find({ 
    pub_date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
    }
  })
};

Article.create = function (incomingArticles) {
  // Copy to avoid mutation
  var attrs = Object.assign({}, incomingArticles);
  var existingArticles = [];

  console.log("about to send to DB");

  Article.allIds().then(function(rows){
    existingArticles = rows.map(function(row){
      return row.id;
    });
    insert();
  });

  function insert() {
    for (article of incomingArticles) {
      if (existingArticles.indexOf(article.id) < 0) {
        db.collection('articles').insert(article);
      }
    }
  }

  console.log("all done sending to DB");
};
