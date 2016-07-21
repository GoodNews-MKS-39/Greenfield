var db = require('./db');

var Comments = module.exports;

//change these to db.collection('comments') for deployment or if youre getting erros

Comments.findByTitle = function (title) {
	if(db.collection('comments')) {
		return db.collection('comments').find({title: title})
	} else {
		return db.comments.find({titile: title})
	}
}

Comments.newComment = function (title, username, msg) {
	if(db.collectio('comments')) {	
		return db.collection('comments').insert({
			title: title,
			username: username,
			msg: msg
		})
	} else {
		return db.comments.insert({
			title: title,
			username: username,
			msg: msg
		})
	}
}