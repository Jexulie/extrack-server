var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 404 Not Found */
router.get('/404', function(req, res, next){

});

/* 401 Unauthorized */
router.get('/401', function(req, res, next){

});

/* 500 Server Internal Error */
router.get('/500', function(req, res, next){

});

module.exports = router;
