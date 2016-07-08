// methods for getting filtered data from the DB
import fetch from 'isomorphic-fetch'

import { checkStatus } from '../../server/apiModels/lib/util.js'

export function fetchArticles() {
  /*grab articles from db*/
  return fetch('/articles')
  /*do we need checkStatus? making call to db not url*/
    .then(checkStatus)
}

