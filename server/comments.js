var db = require('./db');

var Comments = module.exports;

//change these to db.collection('comments') for deployment or if youre getting erros

Comments.findByTitle = function (title) {
	return db.collection('comments').find({title: title})
}

Comments.newComment = function (title, username, msg) {
	return db.collection('comments').insert({
		title: title,
		username: username,
		msg: msg
	})
}