var express = require('express');
var router = express.Router();

/* GET home page. */
var index = require('./index');
router.get('/', index);

var search = require('./search');
router.post('/search', search);

var login = require('./login');
router.post('/login', login);

var checkLoan = require('./checkLoan');
router.post('/checkLoan',checkLoan);


module.exports = router;
