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
  });
};

Article.noTone = function () {
  //console.log('getting stories without tones');
  return db.collection('articles').find({ 
    tones: null
  });
};

Article.addTone = function (_id, tones) {
  return db.collection('articles').update({ 
    "_id" : _id },
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

Article.cleanUp = function() {
  console.log('cleaning up');
  return db.collection('articles').find({ 
    paragraph: /!--/
  }).then(function(obituaries){
    console.log('obituaries', obituaries);
    obituaries.forEach(function(obituary){
      db.collection('articles').remove({ _id: obituary._id});
    });
  });

  return db.collection('articles').find({ 
    paragraph: null
  }).then(function(empties){
    console.log('empties', empties);
    empties.forEach(function(empty){
      db.collection('articles').remove({ _id: empty._id});
    });
  });

  return db.collection('articles').find({ 
    paragraph: ''
  }).then(function(blanks){
    console.log('blanks', blanks);
    blanks.forEach(function(blank){
      db.collection('articles').remove({ _id: blank._id});
    });
  });

}
