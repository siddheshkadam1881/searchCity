var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
  apiVersion: '7.2', // use the same version of your Elasticsearch instance
});
/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log("hii")
  // res.render('index', { title: 'Express' });
  client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
})
});

router.post('/create', function(req, res, next) {
  client.index({
    index: 'blog',
    id: '1',
    type: 'posts',
    body: {
        "PostName": "Integrating Elasticsearch Into Your Node.js Application",
        "PostType": "Tutorial",
        "PostBody": "This is the text of our tutorial about using Elasticsearch in your Node.js application.",
    }
  }, function(err, resp, status) {
    console.log(resp);
  });
})

module.exports = router;
