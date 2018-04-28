var express = require('express');
var router = express.Router();
var config = require('../config/config.json');
var exec = require('child_process').exec;

/* GET users listing. */
router.post('/', function(req, res, next) {
  //ノーマライズ処理
  let aacgain = config.cmd.aacgain;
  let cmd = aacgain.path + " " + aacgain.option + " " + config.music.fileName;
  exec(cmd, function(err, stdout, stderr){
    if (err) {
      res.status(500).send(err);
    }else{
      res.status(200).send('ok');
    }
  });
});

module.exports = router;
