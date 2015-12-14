var express = require('express');
var xssFilters = require('xss-filters');
var router = express.Router();

// GET home page
router.get('/', function(req, res, next) {
  res.locals.title = "Book Something";
  res.render('index');
});

// POST to home page
router.post('/', function(req, res, next) {
  res.locals.email = req.body.email;
  
  //res.locals.email = xssFilters.inHTMLData(req.body.email);
  
  res.render('thankyoumessage');
});

module.exports = router;
