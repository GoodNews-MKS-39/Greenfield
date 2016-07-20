var express = require('express');
var path = require('path');
var browserify = require('browserify-middleware');
var news = require('./apiModels/news');
var app = express();
var Article = require('./apiModels/articles');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, "../client/public")));
app.use(bodyParser.json());

app.get('/app-bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
);

var port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log("Listening on localhost:" + port);
});



