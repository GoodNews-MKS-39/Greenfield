//getting data from watson, need to format

var watson = require('watson-developer-cloud');
var apiKeys = require('./lib/apiKeys');
var news = require('./news.js');
var Article = require('./articles');

var exports = module.exports;

var  tone_analyzer = watson.tone_analyzer({
  username: "93cbe6f4-4896-4c87-a5e8-9533add71bb2",
  password: apiKeys.watsonPassword,
  version: 'v3',
  version_date: '2016-05-19'
});

exports.toneCheck = function(_id, input) {
  tone_analyzer.tone({ text: input },
  function(err, tone) {
    if (err)
      console.log(err);
    else
    var inputTones = tone.document_tone.tone_categories;
    Article.addTone(_id, inputTones);
  })
}
