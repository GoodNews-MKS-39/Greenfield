var express     = require('express');
var path 	    = require('path');
var browserify  = require('browserify-middleware');
var bodyParser  = require('body-parser');
var watson      = require('watson-developer-cloud');
var fs 		    = require('fs');
var credentials = require('./watsonCredentials')

var app = express();

app.use(express.static(path.join(__dirname, "../client/public")));
app.use(bodyParser.json());

app.get('/app-bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
);

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
	stream.pipe(fs.createWriteStream(path.join(__dirname, "../client/public/hello_world.wav")));
	stream.on('end', function() {
		res.status(200).send({})
	})	
})

var port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log("Listening on localhost:" + port);
});






