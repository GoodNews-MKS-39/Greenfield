// methods for getting filtered data from the DB
import fetch from 'isomorphic-fetch';

export function fetchAllSources() {
  /*grab articles from db that are within a given date range*/
  return fetch('https://newsapi.org/v1/sources')
    .then(resp => resp.json().then(x => x.sources.map(source => source)))
}

export function fetchAllArticles(source) {
  console.log('fetching articles for', source)
  return fetch(`https://newsapi.org/v1/articles/?source=${source}&apiKey=230b53e7dc294643b8a26493f04f49e0`, { method: 'GET' })
      .then(resp => resp.json());
}

export function fetchVoice(words) {
	console.log('sending words to be read', words)
	let obj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({words: words})
  }
	return fetch('/textToSpeech', obj).then(resp => resp.json())
}