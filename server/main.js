"use strict"
var express     = require('express');
var path 	    = require('path');
var browserify  = require('browserify-middleware');
var bodyParser  = require('body-parser');
var watson      = require('watson-developer-cloud');
var fs 		    = require('fs');
var credentials = require('./watsonCredentials')
var Comments = require('./comments')

var app = express();

app.use(express.static(path.join(__dirname, "../client/public")));
app.use(bodyParser.json());

app.get('/app-bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
);

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

app.post('/textToSpeech', function(req, res) {
	var text_to_speech = watson.text_to_speech({
	  username: credentials.username,
	  password: credentials.password,
	  version: 'v1'
	});

	var params = {
	  text: req.body.words,
	  voice: 'en-US_MichaelVoice',
	  accept: 'audio/wav'
	};
	// Pipe the synthesized text to a file.
	var stream = text_to_speech.synthesize(params)
	stream.pipe(fs.createWriteStream(path.join(__dirname, "../client/public/textToSpeech.wav")));
	stream.on('end', function() {
		res.status(200).send({})
	})
})

var port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log("Listening on localhost:" + port);
});
