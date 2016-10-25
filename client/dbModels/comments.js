import fetch from 'isomorphic-fetch';

function removeSlash(string) {
	if (string.includes('/')) {
		string.replace('/', '')
	}
	return string
}


export function fetchComments(title) {
	//remove any slashes from title
	title = title.replace(/[^a-zA-Z0-9]/g, '');
	//grab comments from db given the title
	return fetch('/comments/'+title)
	.then(resp => resp.json())
}

export function postComment(title, username, msg) {
	//remove any slashes from title
	title = title.replace(/[^a-zA-Z0-9]/g, '');


	return fetch('/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ title: title, username: username, msg: msg})
	})
	.then(resp => resp.json())
}