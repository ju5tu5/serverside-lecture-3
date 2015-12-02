var express = require('express');
var router = express.Router();

// Fake unsafe crappy object database
var users = [
  {username:"ju5tu5", password:"letmein"}
];

// Should we login or show the sensitive data
router.get('/', function(req, res, next) {
  if(req.session.login){
    res.render('secrets/index');    
  }else{
    res.redirect(req.baseUrl + '/login');
  }
});

// Logout and redirect
router.get('/logout', function(req, res, next){
  req.session.destroy(function(){
    res.redirect(req.baseUrl);
  });
});

// Show the login form
router.get('/login', function(req, res, next) {
  res.locals.req = req;
  res.render('secrets/login');
});

// Handle authentication posted from the form (no checks at all)
router.post('/login', function(req, res, next) {
  console.log('login attempt for ', req.body.username, ' using ', req.body.password);
  // USUALLY YOU WOULD CHECK IF THE LOGIN CREDENTIALS ARE CORRECT
  req.session.regenerate(function(){
    req.session.login = true;
    req.session.username = req.body.username;
    res.redirect(req.baseUrl);
  });
});

module.exports = router;
