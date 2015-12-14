// Load modules
var path = require('path'), // core
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    multer = require('multer'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection');

// Define upload dir
var upload = multer({dest: 'public/uploads/'});

// Define routers
var indexRouter = require('./routes/index'),
    booksRouter = require('./routes/books'),
    downloadsRouter = require('./routes/downloads'),
    adminRouter = require('./routes/admin'),
    errorRouter = require('./routes/error');

// Set up the app
var app = express();

// Connect to MySQL
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'student',
  password: 'serverSide',
  port: 3306,
  database: 'student'
}, 'single'));

// Use sessions
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
app.use('/downloads', downloadsRouter);
app.use('/admin', upload.single('bs-file'), adminRouter);

// If no routes handled the request, we clearly have an error
app.use(errorRouter);

// Tell the app to listen to incoming traffic on port 3000
app.listen(3000, function(){
  console.log("Started on port 3000");
});
