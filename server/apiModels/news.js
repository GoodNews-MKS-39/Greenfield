var fetch = require('isomorphic-fetch');
//var checkStatus = require('checkStatus');
//var checkStatus = require('checkStatus');
//module exports??
// import { checkStatus } from './lib/util.js'
var exports = module.exports;

exports.getArticles = function(startDate, endDate) {
  return fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
    method: 'GET',
    headers: {
      'api-key': "8c5ba446200842de9b5f427401bdb11a",
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
        console.log('body', stories.response.docs);
        stories.response.map(function(story) {
          return {url: web_url, paragraph: lead_paragraph, multimedia: multimedia, headline: headline, }
        })
    });
}
web_url, snippet, source, multimedia, headline, keywords, _id, word_count