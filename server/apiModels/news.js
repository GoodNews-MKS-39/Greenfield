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
        if (!!story) watson.toneCheck(story._id, story.paragraph);
      });
    });
  })
}

// the New York Times api returns ten articles per GET request, getFifty makes 5 successive requests
exports.getFifty = function(startDate, endDate, count, callback) {
  //the NYT public api has a call-limit of 5 per second,
  start = new Date(startDate).yyyymmdd();
  end = new Date(endDate).yyyymmdd();
  count = count ? count : 0;
  console.log('count', count, 'start', start, 'end', end);
  for (var page = count; page < count + 5; page++) {
    exports.getArticles(start, end, page);
  }
  if (callback) callback();
}

// make Date format be NYT friendly
Date.prototype.yyyymmdd = function() {
  var mm = ("0" + (this.getMonth() + 1)).slice(-2);
  var dd = (  "0" + this.getDate()).slice(-2);
  return [this.getFullYear(), mm, dd].join('');
}