var watson = require('watson-developer-cloud');
var apiKeys = require('./lib/apiKeys');
var news = require('./news.js')

var exports = module.exports;

// var tone_analyzer = watson.tone_analyzer({
//   username: "ca6d2cfb-3b94-4648-bbf7-f0bf6896c61c",
//   password: apiKeys.watsonPassword,
//   version: 'v3',
//   version_date: '2016-05-19'
// });

// var tone_analyzer.tone({ text: 'Greetings from Watson Developer Cloud!' },
//   function(err, tone) {
//     if (err)
//       console.log(err);
//     else
//       console.log(JSON.stringify(tone, null, 2));
// });