var pmongo = require('promised-mongo');

// if ( process.env.NODE_ENV === 'production' ) {
//   var db = pmongo(process.env.MONGODB_URI, {
//     authMechanism: 'ScramSHA1'
//   });
// }
// else {
//   var db = pmongo('goodnewsdb');
// }

var uri = 'mongodb://fullstackwizards:pancakes@ds021915.mlab.com:21915/goodnews';

var db = pmongo(uri, {
  authMechanism: 'ScramSHA1'
});

module.exports = db;

// clears database
db.deleteEverything = function () {
  return Promise.all([
    db.collection('articles').remove({})
  ])
};