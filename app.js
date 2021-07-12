const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./dbconnection');
const Recipe = require('./models/Recipe');

require('dotenv').config(); //dotenv -moduuli tarvitaan jos aiotaan käyttää .env -filua
connectDB();

// Import routes
const recipesRoute = require('./routes/recipes');
const usersRouter = require('./routes/users');

//cors avaa yhteyden palvelinsovelluksen ja asiakassovelluksen välille
// jos nämä sijaitsevat eri palvelimilla

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// reittien käyttöönotto
app.use('/recipes', recipesRoute);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3005, () => {
  console.log('Listening on port 3005');
});

module.exports = app;
