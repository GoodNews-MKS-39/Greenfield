var db = require('../db');

var Article = module.exports;

// grabs all articles from db
Article.all = function () {
  return db.collection('articles').find({});
};

// grabs all article id's from db to make sure no duplicates
Article.allIds = function () {
  return db.collection('articles').find({}, {id: 1});
};

// query db for articles by date
Article.findByDate = function (startDate, endDate) {
  return db.collection('articles').find({ 
    pub_date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
    }
  });
};

// checks db to see which articles haven't been assigned tone scores
Article.noTone = function () {
  return db.collection('articles').find({ 
    tones: null
  });
};

// add tone scores from Watson to database
Article.addTone = function (_id, tones) {
  return db.collection('articles').update({ "_id" : _id },
    { $set: {
      "tones" : tones,
      "anger" : tones[0]['tones'][0]['score'],
      "disgust" : tones[0]['tones'][1]['score'],
      "fear" : tones[0]['tones'][2]['score'],
      "joy" : tones[0]['tones'][3]['score'],
      "sadness" : tones[0]['tones'][4]['score'],
      "analytical" : tones[1]['tones'][0]['score'],
      "confident" : tones[1]['tones'][1]['score'],
      "tentative" : tones[1]['tones'][2]['score'],
      "openness" : tones[2]['tones'][0]['score'],
      "conscientiousness" : tones[2]['tones'][1]['score'],
      "extraversion" : tones[2]['tones'][2]['score'],
      "agreeableness" : tones[2]['tones'][3]['score'],
      "emotional_range" : tones[2]['tones'][4]['score'],
    }
  })
};

// adds articles to db
Article.create = function (incomingArticles) {
  // Copy to avoid mutation
  var attrs = Object.assign({}, incomingArticles);
  var existingArticles = [];

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

};

// removes articles that don't have a summary paragraph
Article.cleanUp = function() {
  return db.collection('articles').find({ 
    paragraph: /!--/ })
  .then(function(obituaries) {
    obituaries.forEach(function(obituary) {
      db.collection('articles').remove({ _id: obituary._id});
    });
  });

  return db.collection('articles').find({ 
    paragraph: null })
  .then(function(empties) {
    empties.forEach(function(empty) {
      db.collection('articles').remove({ _id: empty._id});
    });
  });

  return db.collection('articles').find({ 
    paragraph: '' })
  .then(function(blanks) {
    blanks.forEach(function(blank) {
      db.collection('articles').remove({ _id: blank._id});
    });
  });

};
