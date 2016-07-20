import fetch from 'isomorphic-fetch';

export function fetchComments(title) {
	//grab comments from db given the title
	return fetch('/comments/:title')
	.then(resp => resp.json())
}

export function postComment(title, username, msg) {
	return fetch('/comments/:title', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username: username, msg: msg})
	})
	.then(resp => resp.json())
}