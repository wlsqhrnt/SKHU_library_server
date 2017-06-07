var request = require('request');
var express = require('express');
var router = express.Router();
var functions = require('./functions');

router.post('/search', function(req,res,next) {
  setImmediate(function(){
      try {
          var searchkeyword = req.body.search
          var pages = req.body.pages
          console.log(searchkeyword);
          console.log(pages);

          functions.getBook(searchkeyword, pages, function(result){
              res.status(200).json(result);
          })

      } catch(e) {
          res.status(400).send('byd world');
      }

  });
res.end
});


module.exports = router;
