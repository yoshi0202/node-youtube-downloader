var express = require('express');
var router = express.Router();
var ID3Writer = require('browser-id3-writer');
var fs = require('fs');
var config = require('../config/config.json');

/* GET users listing. */
router.post('/', function(req, res, next) {
  let songBuffer = fs.readFileSync(config.music.fileName);
  let writer = new ID3Writer(songBuffer);
  writer.setFrame('TIT2', req.body.song_name)
        .setFrame('TALB', req.body.album_name)
        .setFrame('TPE1', [req.body.artist_name])
  writer.addTag();
  let taggedSongBuffer = Buffer.from(writer.arrayBuffer);
  fs.writeFileSync(config.music.fileName, taggedSongBuffer);
  res.status(200).send('ok');
});

module.exports = router;
