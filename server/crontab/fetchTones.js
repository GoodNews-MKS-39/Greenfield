var news = require('../apiModels/news');
var Article = require('../apiModels/articles');
var watson = require('../apiModels/watson');

Article.noTone()
.then(function(noTones){
  noTones.forEach(function(story){
    if (story.paragraph !== null) watson.toneCheck(story._id, story.paragraph);
  });
});

setTimeout(process.exit, 7000);