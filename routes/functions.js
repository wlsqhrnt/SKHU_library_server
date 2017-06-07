var request = require('request');
  exports.getBook = function(searchkeyword, pages, callback){
    const options = {
        url: 'http://library.skhu.ac.kr/search/Search.Result.ax?q=ALL%3A' + searchkeyword + '&mf=true&page=' + pages,
        form: {
            qt: '%EC%A0%84%EC%B2%B4%3D' + searchkeyword,
            qf: searchkeyword,
            f: '',
            br: '',
            cl: '1%202%203%204%2047%207%209%2010%2011%2013%2015%205%2035%2022%2026%2042%2024%2040%2041%2046%2045%2027%2043%2029%2031%2032%2033%2034%2036%2037%2038%2044%2048%2049',
            gr: '1%202%203%204%205%206%207%208%209%2010%2021%2028',
            rl: pageSize = 10,
            s: '',
            st: '',
            h: '',
            cr: '',
            py: '',
            subj: '',
            facet: '',
            nd: '',
            vid: '0',
            vid: 0,
            fv: '',
            tabID: '',
            categoryID: ''


        }
    }
    request.get(options, function (err, res, body) {
        if (err)
            console.log("post error")

        var text = body
        text = text.substring(10000, text.length - 10000)
        var newtext = getBookInfo(text)
        console.log(getJson(newtext))
        callback(getJson(newtext))
    })}

    function getJson(text) {
      //console.log(typeof text) -> object
      var bookname = getBookName(text)
      var bookmark = getBookMark(text)
      var bookposs = getBookPoss(text)
      var bookcid = getBookCid(text)
      var arrayList = []
      for (var i = 0; i < bookname.length; i++) {
          var bookInfoObject = new bookInfo(bookname[i], bookmark[i], bookposs[i],bookcid[i])
          arrayList.push(bookInfoObject)
      }
      return arrayList
    }


  function getBookInfo(text){

    var re = /3*amp;cid.*onclick=.go..*\r\n.*\r\n.*\r\n.*\r\n.*\r\n.*\r\n.*\r\n.*\r\n.*\r\n.*\r\n.*\r\n.*\r\n.*\r\n.*\r\n.*\r\n.*\r\n.*\r\n.*/g
    var result = text.match(re)
    return result}
  function getBookName(text) {
    var re = /class=.title.>.*<.a>/g
    var result = []
    var index
    for(var i = 0;i<text.length;i++){
        result.push(String(text[i].match(re)))
        result[i] = result[i].substring(14)
        index = result[i].indexOf('<')
        result[i] = result[i].substring(0,index)
    }
    return result}
  function getBookPoss(text) {
    var re = /<span [class,id].*\r\n.*\r\n.*/g
    var result = []
    var poss1 = "대출가능"
    var poss2 = "대출중"
    var poss3 = "정리중"
    var poss4 = "대출불가"
    var poss5 = "전자 데이터 책"
    for(var i = 0;i<text.length;i++){
        var x = String(text[i].match(re))
        if (x) {
            if (x.indexOf(poss1) != -1)
                result.push(poss1)
            else if (x.indexOf(poss2) != -1)
                result.push(poss2)
            else if (x.indexOf(poss3) != -1)
                result.push(poss3)
            else if (x.indexOf(poss4) != -1)
                result.push(poss4)
            else
                result.push(poss5)

        }

    }
    return result}
  function getBookMark(text) {
    var re = /class="underline">.*<.a>.*\r\n.*\[.*\]/g
    var result = []
    var nodata = "전자데이터책"
    for(var i = 0;i<text.length;i++){
        var x = String(text[i].match(re))
        if(x != "null"){
            result.push(x.substring(68))
        }
        else{
            result.push(nodata)
        }
    }
    return result}
  function getBookCid(text){
    var re = /cid........./g
    var result = []
    for(var i = 0; i <text.length; i++){
        var x = String(text[i].match(re))
        x = x.substring(4)
        index = x.indexOf('\"')
        x = x.substring(0,index)
        result.push(x)
    }
    return result}
  function bookInfo(name, mark, poss, cid){
    this.name = name;
    this.mark = mark;
    this.poss = poss;
    this.cid = cid;}
