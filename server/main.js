var express = require('express');
var path = require('path');
var browserify = require('browserify-middleware');
var watson = require('./apiModels/watson');
var news = require('./apiModels/news');
var app = express();
var Article = require('./apiModels/articles');
var bodyParser = require('body-parser')

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
  Article.findByDate(req.body.startDate, req.body.endDate).then(function(articles){
    res.status(200).send(articles);
  });
});

//call to NYT api ->
//news.getFifty(20160712, 20160712); 

//call to Watson tone-analyzer ->
//watson.toneCheck('Pass me the Articles to check!');


var port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log("Listening on localhost:" + port);
});



