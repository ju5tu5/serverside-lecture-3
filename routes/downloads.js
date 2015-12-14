var express = require('express'),
    fs = require('fs');
var router = express.Router();

// GET file list
router.get('/', function(req, res, next) {
  fs.readdir('public/uploads/', function(err, files) {
    if(err) return next(err);
    // geef de bestandenarray mee aan de view
    res.locals.files = files;
    res.render('downloads/index');
  });
});

module.exports = router;
