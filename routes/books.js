var express = require('express');
var router = express.Router();

var books = [
  {author: "Gottfried Wilhelm Leibniz", title: "Monadologie", excerpt: ""},
  {author: "Immanuel Kant", title: "Kritik Der Reinen Vernunft", excerpt: ""},
  {author: "Georg Wilhelm Friedrich Hegel", title: "Grundlinien Der Philosophie Des Rechts", excerpt: ""},
  {author: "Edmun Husserl", title: "Ideeen", excerpt: ""},
  {author: "Martin Heidegger", title: "Sein und Zeit", excerpt: ""},
  {author: "Immanuel Levinas", title: "Totalité et Infinité", excerpt: ""}
];

/* GET book list. */
router.get('/', function(req, res, next) {
  res.locals.books = books;

  res.render('books/index');
});

/* GET one book by index */
router.get('/:index', function(req, res, next){
  res.locals.book = books[req.params.index];

  res.render('books/show');
});

module.exports = router;
