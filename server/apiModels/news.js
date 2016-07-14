var fetch = require('isomorphic-fetch');
var Article = require('./articles');
var util = require('./lib/util.js');
var apiKeys = require('./lib/apiKeys');
//request-promise module
var rp = require('request-promise');
var watson = require('./watson');



var exports = module.exports;
exports.getArticles = function(startDate, endDate, byTen) {
  //call to New York Times API
  rp.get({
  url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
  qs: {
    'api-key': apiKeys.nytKey,
    'begin_date': startDate,
    'end_date': endDate,
    'page': byTen
  },
}).then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return JSON.parse(response);
  })
  .then(function(stories) {
      var storyArray = stories.response.docs.map(function(story) {
        return {url: story.web_url, paragraph: story.lead_paragraph, multimedia: story.multimedia, headline: story.headline, keywords: story.keywords, pub_date: story.pub_date, id: story._id, word_count: story.word_count}

      });
      console.log(storyArray);
      // var storyTones = storyArray.map(function(story) {
      //   console.log('story.paragraph:', story.paragraph);
      //   var tone = watson.toneCheck(story.paragraph);
      // })

      //console.log('storyTones:', storyTones);
      //create DB with desired article data
      Article.create(storyArray);
  })
}

//the New York Times api returns ten articles per GET request, getFifty makes 5 successive requests
exports.getFifty = function(startDate, endDate) {
  var count = 0;
  //the NYT public api has a call-limit of 5 per second,
  //we can put a timeout for another 5 if desired
  while (count < 5) {
    exports.getArticles(startDate, endDate, count);
    count++;
  }
}







