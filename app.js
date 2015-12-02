// Load modules
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session');

// Define routers
var indexRouter = require('./routes/index'),
    booksRouter = require('./routes/books'),
    secretRouter = require('./routes/secrets'),
    errorRouter = require('./routes/error');

// Set up the app
var app = express();

// Use session
app.use(session({
  secret: "SomeoneToldMeThisWebsiteIsAboutBooksOrSomething",
  resave: false,
  saveUninitialized: true
}));

// Define bodyparser (handles POST requests)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Define the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Tell express which static files to serve
app.use(express.static('public'));

// Connect the routers to routes
app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/secrets', secretRouter);

// If no routes handled the request, we clearly have an error
app.use(errorRouter);

// Tell the app to listen to incoming traffic on port 3000
app.listen(3000, function(){
  console.log("Started on port 3000");
});
