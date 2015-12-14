var fs = require('fs'),
    express = require('express')
var router = express.Router();

// Index page, login required
router.get('/', function(req, res, next) {
  if(req.session.login){
    res.locals.req = req;
    res.render('admin/index');    
  }else{
    res.redirect(req.baseUrl + '/login');
  }
});

// Show the upload form
router.get('/upload', function(req, res, next) {
  if(req.session.login) {
    res.locals.req = req;
    res.render('admin/upload');
  }else{
    res.redirect(req.baseUrl + '/login');  
  }
});

// Handle posted upload forms
router.post('/upload', function(req, res, next) {
  console.log(req.file);
  // A file was uploaded if req.file is not undefined
  if(req.file !== undefined) {
    // Move the file
    fs.rename(req.file.path, req.file.destination + req.file.originalname, function(err){
      if(err) return next(err);
    });
  }
  // check for file types
  res.locals.req = req;
  res.render('admin/upload');
});

// Show the login form
router.get('/login', function(req, res, next) {
  res.locals.req = req;
  res.render('admin/login');
});

// Handle authentication posted from the form (no checks at all)
router.post('/login', function(req, res, next) {
  console.log('login attempt for', req.body.username, 'using', req.body.password);
  
  req.getConnection(function(err, connection){
    if(err) return next(err);

    connection.query('SELECT * FROM users WHERE email="'+req.body.username+'" AND password="'+req.body.password+'";', function(err, result) {
      if(err) return next(err);
      // If there are no results at all, the user does not exist
      if(!result.length>0) return next('User credentials are wrong..');

      req.session.regenerate(function(){
        req.session.login = result.length>0 ? true : false;
        req.session.username = result[0].name;
        res.redirect(req.baseUrl);
      });
    });
  });
});

// Logout and redirect
router.get('/logout', function(req, res, next){
  req.session.destroy(function(){
    res.redirect(req.baseUrl);
  });
});



module.exports = router;
