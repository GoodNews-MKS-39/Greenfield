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

app.get('/articles', function(req, res){
  Article.all().then(function(articles){
    res.status(200).send(articles);
  });
});

app.post('/datedArticles', function(req, res){
  console.log('req.body', req.body);
  news.getFifty(req.body.startDate, req.body.endDate, 0, function(){
    Article.findByDate(req.body.startDate, req.body.endDate).then(function(articles){
      res.status(200).send(articles);
    });
  }); 
});

var port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log("Listening on localhost:" + port);
});



