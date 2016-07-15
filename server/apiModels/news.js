var fetch = require('isomorphic-fetch');
var Article = require('./articles');
var util = require('./lib/util.js');
var apiKeys = require('./lib/apiKeys');
var rp = require('request-promise');
var watson = require('./watson');

var exports = module.exports;

exports.getArticles = function(startDate, endDate, byTen) {
  // call to New York Times API
  rp.get({
  url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
  qs: {
      'api-key': apiKeys.nytKey,
      'begin_date': startDate,
      'end_date': endDate,
      'page': byTen
    },
  })
  .then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return JSON.parse(response);
  })
  .then(function(stories) {
    var storyArray = stories.response.docs.map(function(story) {
    return {url: story.web_url, paragraph: story.lead_paragraph, multimedia: story.multimedia, headline: story.headline, keywords: story.keywords, pub_date: new Date(story.pub_date), id: story._id, word_count: Number(story.word_count), tones: null}
    });
    // send data to database model
    Article.create(storyArray);
  })
  .then(function(){
    Article.noTone()
    .then(function(noTones){
      noTones.forEach(function(story){
        watson.toneCheck(story._id, story.paragraph)
      });
    })
  });
}

// the New York Times api returns ten articles per GET request, getFifty makes 5 successive requests
exports.getFifty = function(startDate, endDate, count) {
  //the NYT public api has a call-limit of 5 per second,
  console.log('count', count);
  for (var page = count; page < count + 5; page++) {
    console.log('page', page);
    exports.getArticles(startDate, endDate, page);
  }
}







