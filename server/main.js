var express = require('express');
var path = require('path');
var browserify = require('browserify-middleware');
var news = require('./apiModels/news');
var app = express();
var Article = require('./apiModels/articles');

app.use(express.static(path.join(__dirname, "../client/public")));

app.get('/app-bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
);

app.get('/articles', function(req, res){
  Article.all().then(function(articles){
    res.status(200).send(articles);
  });
})

var port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log("Listening on localhost:" + port);
});

