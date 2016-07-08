import fetch from 'isomorphic-fetch'; 

import { checkStatus } from './lib/util.js'; 

export function getArticles (startDate, endDate) {
  return fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
    method: 'GET',
    headers: {
      'api-key': "8c5ba446200842de9b5f427401bdb11a",
      'begin_date': startDate,
      'end_date': endDate
    }
  }).then(checkStatus)
}