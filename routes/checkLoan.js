var request = require('request');
var express = require('express');
var router = express.Router();
var async = require('async');

router.post('/checkLoan',function(req,res,next){
  console.log('in checkLoan');
  async.series([
    function task1(callback){
      var cookieData = req.body.cookieData
      var jsonObj = JSON.parse(cookieData)

      var text
      var options = {
            url : 'http://library.skhu.ac.kr/mylibrary/Circulation.ax',
            headers : {
                'cookie' : 'Lib1Proxy2Ssn='+jsonObj[2].value+';,LP1121SID='+jsonObj[1].value+';,JSESSIONID='+jsonObj[0].value
            }
        }
        request.get(options,function (err, res, body) {
          callback(null, body);
        })

    }],
  function (err,results) {
    if(err){
      console.log(error);
      res.end('error');
    }else{
      var result = String(results[0]);
      result = result.substring(20542,result.length - 4186)
      console.log(getJson2(result));
      res.send(getJson2(result))
      return
    }
  })
})

function getBookName2(result){
    var re = /alt=\".*<a/g
    var result = result.match(re)
    for(var i = 0; i<result.length;i++){
        result[i] = result[i].substring(5,result[i].length -7)
    }
    return result

}
function getLendingPeriod(result) {
    var re = /[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g;
    result = result.match(re);
    //console.log(result)
    var result2 = [];
    for(var i = 0 ; i<result.length; i=i+2){
        result2.push(result[i]+' ~ '+result[i+1])
    }
    return result2
}
function getJson2(text){
  var bookName = getBookName2(text)
  var bookLengingPeriod = getLendingPeriod(text)
  var arrayList = []
  for (var i = 0; i<bookName.length; i++){
    var bookInfoObject = new bookInfo2(bookName[i],bookLengingPeriod[i])
    arrayList.push(bookInfoObject)
  }
  return arrayList;
}

function bookInfo2(name,period){
  this.name = name;
  this.period = period;

}

module.exports = router;
