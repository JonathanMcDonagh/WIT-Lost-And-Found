var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

const items = require("./routes/items");
const users = require("./routes/users");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);


//Custom Routes
//GET (ITEMS)
app.get('/items', items.findAllItems);
app.get('/items/likes', items.findTotalLikes);
app.get('/items/:id', items.findOne);
//app.get('/items/:WITRoom', items.findByRoom);

//POST (ITEMS)
app.post('/items',items.addItem);

//PUT (ITEMS)
app.put('/items/:id/like', items.incrementLikes);

//Delete (ITEMS)
app.delete('/items/:id', items.deleteItem);


//GET (USERS)
app.get('/users', users.findAllUsers);
app.get('/users/:id', users.findOneUser);

//POST (USERS)
app.post('/users/:id',users.addUser);

//Delete (USERS)
app.delete('/users/:id', users.deleteUser);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
