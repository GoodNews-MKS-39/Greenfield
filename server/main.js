var express = require('express');
var path = require('path');
var browserify = require('browserify-middleware');
var news = require('./apiModels/news');
var app = express();
var Article = require('./apiModels/articles');
var Comments = require('./apiModels/comments')
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, "../client/public")));
app.use(bodyParser.json());

app.get('/app-bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
);


app.get('/articles', function(req, res) {
  Article.all()
  .then(function(articles) {
    res.status(200).send(articles);
  });
});

//endpoint for article comments
app.get('/comments/:title', function(req, res) {
  //grab title from params (url)
  let title = req.params.title;
  //talk to Comments apiModel
  //search for comment by title

  Comments.findByTitle(title)
  .then(function(comments){
    console.log('comments ', comments)
    res.send(comments)
  })
  .catch(function(error){
    console.log('error ' , error);
  })
})

app.post('/comments', function(req, res) {
  //grab title, username and msg from body send by client
  let title = req.body.title;
  let username = req.body.username;
  let msg = req.body.msg;

  //talk to Comments apiModel
  //insert new comment into comments DB through api model
  Comments.newComment(title, username, msg)
  .then(function(comment){
    res.status(200).send(comment)
  })
  .catch(function(err){
    console.log('err: ', err)
  })

})

app.post('/datedArticles', function(req, res) {
  console.log('req.body', req.body);
  news.getFifty(req.body.startDate, req.body.endDate, 0, function() {
    Article.findByDate(req.body.startDate, req.body.endDate).then(function(articles) {
      res.status(200).send(articles);
    });
  }); 
});

var port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log("Listening on localhost:" + port);
});



