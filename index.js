require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var taskRouter = require('./routes/task');
var usertaskRouter = require('./routes/usertask');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Define Route
// greeting api
app.use('/', indexRouter);

//users api
app.use('/users', usersRouter);

// task Api

app.use('/tasks', taskRouter);

//usertask api

app.use('/usertask', usertaskRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Set port
const port = process.env.APP_PORT || 4000;

const env = process.env.ENV_TYPE || 'production';

if(env === 'development') {
  //start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  });
}

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

module.exports = app;
