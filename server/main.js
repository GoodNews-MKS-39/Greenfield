var express = require('express');
var path = require('path');
var browserify = require('browserify-middleware');
var app = express();
var news = require('./apiModels/news');
var watson = require('./apiModels/watson');

// app.use(express.static(path.join(__dirname, "../client/public")));

// app.get('/app-bundle.js',
//  browserify('./client/main.js', {
//     transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
//   })
// );

app.get('/', function (req, res) {
  // get today's news --> save it to the DB --> feed it through watson --> save it to the DB
  // res.sendFile(path.resolve(__dirname + '/../client/index.html'));
  console.log('stuff');
  news.getArticles(20160708,20160708);
  //watson.tone_analyzer.tone();
  res.write('news');
	res.end();
});

var port = process.env.PORT || 4000;
app.listen(port, function() {
	console.log("Listening on localhost:" + port);
});

