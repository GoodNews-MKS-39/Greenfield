// Promise.reject for 400+ status code responses
var Util = module.exports;
Util.checkStatus = function(response){
  return response.json()
    .then(function(data){
      return response.status >= 400
        ? Promise.reject(data)
        : data
    })
}
