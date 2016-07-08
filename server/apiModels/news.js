var fetch = require('isomorphic-fetch');
var Article = require('./articles');
var util = require('./lib/util.js');
var apiKeys = require('./lib/apiKeys');
//TODO figure out requiring/exports, hide api key

var exports = module.exports;
exports.getArticles = function(startDate, endDate) {
  //call to New York Times API
  return fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
    method: 'GET',
    headers: {
      'api-key': apiKeys.nytKey,
      'begin_date': startDate,
      'end_date': endDate
    }
  }).then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(function(stories) {
      var storyArray = stories.response.docs.map(function(story) {
        return {url: story.web_url, paragraph: story.lead_paragraph, multimedia: story.multimedia, headline: story.headline, keywords: story.keywords, pub_date: story.pub_date, id: story._id, word_count: story.word_count}
      });
      //create DB with desired article data
      console.log('storyArray:', storyArray);
      Article.create(storyArray);
  })
  .then(function () {
    util.checkStatus();
  });
}
