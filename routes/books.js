var express = require('express');
var router = express.Router();

// GET book list
router.get('/', function(req, res, next) {

  // Try to use the database, pass an error if something fails
  req.getConnection(function(err, connection){
    if(err) return next(err);
    // Run a query on the database, pass an error if something fails
    connection.query('SELECT * FROM books', function(err, result) {
      if(err) return next(err);
        // Pass the result (if any) to the template
        console.log(result);
        res.locals.books = result;
        res.render('books/index');
    });
  });
});

// GET one book by index
router.get('/:index', function(req, res, next){
  // Try to use the database, pass an error if something fails
  req.getConnection(function(err, connection){
    if(err) return next(err);
    
    // Run a query on the database, pass an error if something fails
    connection.query('SELECT * FROM books WHERE bookID='+req.params.index+';', function(err, result) {
      if(err) return next(err);
      // Pass the result (if any) to the template
      res.locals.book = result[0];
      res.render('books/show');
    });
  });
});

module.exports = router;
