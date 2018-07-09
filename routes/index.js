var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

/* 404 Not Found */
router.get('/404', function(req, res, next){
  res.status(404);
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

/* 401 Unauthorized */
router.get('/401', function(req, res, next){
  res.status(401);
  res.sendFile(path.join(__dirname, '../public', '401.html'));
});

/* 500 Server Internal Error */
router.get('/500', function(req, res, next){
  res.status(500);
  res.sendFile(path.join(__dirname, '../public', '500.html'));
});

module.exports = router;
