var express = require('express');
var router = express.Router();
var config = require('../config/config.json');
var exec = require('child_process').exec;
var async = require('async');
var fs = require('fs');

/* GET users listing. */
router.post('/', function(req, res, next) {
  let artist_name = req.body.artist_name;
  let album_name = req.body.album_name;
  let song_name = req.body.song_name;
  //asyncで順次処理
  async.series([
    function(callback){
      //アーティストディレクトリがなければ作成
      let dirpath = config.moveToFilePath + artist_name;
      if(!fs.existsSync(dirpath)){
        fs.mkdir(dirpath,function(err){
          if(err){
            console.log(err);
            callback(err,1)
          }else{
            callback(null,1);
          }
        });
      }else{
        callback(null,1);
      }
    },
    function(callback){
      //アルバムディレクトリがなければ作成
      let dirpath = config.moveToFilePath + artist_name + "/" + album_name;
      if(!fs.existsSync(dirpath)){
        fs.mkdir(dirpath,function(err){
          if(err){
            console.log(err);
            callback(err,1)
          }else{
            callback(null,1);
          }
        });
      }else{
        callback(null,1);
      }
    },
    function(callback){
      //リネーム処理
      fs.rename(config.music.fileName, config.moveToFilePath + artist_name + "/" + album_name + "/" + song_name + ".mp3", function (err) {
        if(err){
          console.log(err);
          callback(err,1)
        }else{
          callback(null,1);
        }
      });
    }
  ],function(err, results){
    if(err){
      //エラー発生時処理
      res.status(500).send(err);
    }else{
      //正常終了
      res.status(200).send('ok');
    }
  });
});

module.exports = router;
