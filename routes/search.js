var express = require('express');
var router = express.Router();
var Gracenote = require("node-gracenote");
var config = require('../config/config.json');
var clientId = config.gracenote.clientId;
var clientTag = config.gracenote.clientTag;
var userId = config.gracenote.userId;
var api = new Gracenote(clientId,clientTag,userId);

/* GET users listing. */
router.post('/', function(req, res, next) {
  api.searchTrack(req.body.search_artist, "", req.body.search_songname, function(err, result) {
    // Search Result as array
    res.send(result);
  });
});

module.exports = router;
