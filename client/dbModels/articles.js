// methods for getting filtered data from the DB
import fetch from 'isomorphic-fetch'

import { checkStatus } from '../../server/apiModels/lib/util.js'

export function fetchArticles() {
  /*grab all articles from db*/
  return fetch('/articles')
  .then(checkStatus)
}

export function fetchDatedArticles(startDate, endDate) {
  /*grab articles from db that are within a given date range*/
  return fetch('/datedArticles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ startDate: startDate, endDate: endDate })
  })
  .then(checkStatus)
}