const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// body-parser setup.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view setup.
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// asset setup.
app.use(express.static(__dirname + '/public'));

// auth setup.
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// logger setup.
app.use(logger('dev'));

const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);
app.use(cookieParser());

// root route.
app.get('/', (req, res) => {
  res.render('login');
})

// Hook up controllers yourself.
app.use('/shows', require('./controllers/shows-controller'));
app.use('/users', require('./controllers/users-controller'));

// start the app.
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
