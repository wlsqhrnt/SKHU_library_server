var express = require('express');
var router = express.Router();
var path = require('path');
var chProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var cookieParser = require('cookie-parser');

var app = express()
app.use(cookieParser());

router.post('/login',function(req,res,next){
    var id = req.body.id;
    var passWord = req.body.passWord;
    var childArgs = [
       '--ignore-ssl-errors=yes',
        path.join(__dirname,'test.js'),
        id,
        passWord
        
      ];
      chProcess.execFile(binPath,childArgs,function(err,stdout,stderr){
        var re = /\[\{\"domain.*/g
        var result = String(stdout.match(re))

        result = result.replace(/\'/g,"");
        var jsonObj = JSON.parse(result);
        console.log(jsonObj);
        res.send(jsonObj);
      })
    })
    module.exports = router;
