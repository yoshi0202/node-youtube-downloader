var express = require('express');
var router = express.Router();
var youto = require('youtube-to');
var config = require('../config/config.json');

/* GET users listing. */
router.post('/', function(req, res, next) {
  youto(req.body.download_url,{filename: 'tmp.mp3'})
  .then(function(){
    res.send("ok");
  }).catch(function(err){
    res.status(500).send(err);
  });
});

module.exports = router;
