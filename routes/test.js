var system = require('system');
var page = require('webpage').create();
var async = require('async');

var ID = system.args[1];
var PW = system.args[2];
var tried = false;
page.settings.userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";

page.open('https://library.skhu.ac.kr/index.ax',function(status){});
page.onLoadFinished = function () {
  page.evaluate(function (id,pw) {
    document.querySelector("input[name='headerUserID']").value = id;
    document.querySelector("input[name='headerPassword']").value = pw;
    document.querySelector("input[class='top_btn_login']").click();
  },ID,PW);

  window.setTimeout(function(){
    page.render('test123.png');
    console.log(JSON.stringify(page.cookies));
    phantom.exit();
  },3000);
}
