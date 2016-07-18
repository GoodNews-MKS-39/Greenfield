var pmongo = require('promised-mongo');

if ( process.env.NODE_ENV === 'production' ) {
  var db = pmongo(process.env.MONGODB_URI, {
    authMechanism: 'ScramSHA1'
  });
}
else {
  var db = pmongo('goodnewsdb');
}

module.exports = db;

// clears database
db.deleteEverything = function () {
  return Promise.all([
    db.collection('articles').remove({})
  ])
};