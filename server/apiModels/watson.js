import fetch from 'isomorphic-fetch'

import { checkStatus } from './lib/util.js'

export function fetchShops() {
  return fetch('http://pet-shop.api.mks.io/shops/1')

    .then(checkStatus)
    }


export function fetchPets() {
  return fetch('http://pet-shop.api.mks.io/shops/1/pets')
    .then(checkStatus)
}

export function likePet(petId) {
  return fetch('http://pet-shop.api.mks.io/shops/1/pets/' + petId + '/like', {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
       'Authorization': `API token="${localStorage.apiToken}"`
      }
    })
    .then(checkStatus)
}

exports.getTone = function(paragraph) {
  return 
}

// fetch("http://127.0.0.1:8080/v1.0/users", {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         email: 'foo',
//         pass: 'bar'
//       })
//     }).then(response => console.log(response))