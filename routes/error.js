var express = require('express');
var router = express.Router();

// This is a catch-all line, it responds to any and all GET requests that get here
router.get('*', function(req, res, next) {
  res.status(404);

  // Plx respond in the way that fits the client
  if(req.accepts('html')) {
    res.render('404', {url: req.url});

  } else if(req.accepts('json')) {
    res.send({error: 'Not found'});

  } else {
    res.type('txt').send('Not found');
  }
});

module.exports = router;
