var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
let { initializeDatabase } = require('./utils/dbCreateHelper');
const db = require('./config/database');
const Admin = require('./models/admins');
const adminSeeder = require('./seeders/adminSeeder');
const Application = require('./models/applications');
const applicationSeeder = require('./seeders/applicationSeeder');


var indexRouter = require('./routes/index');
var applicationsRouter = require('./routes/applications');
let adminsRouter = require('./routes/admins');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/applications', applicationsRouter);
app.use('/admins',adminsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


//db models sync
initializeDatabase().then((res) => {
  db.sync().then((result) => {
    console.log('models synced successfully')

    // Check if the admin table is empty
    Admin.count().then((countResponse) => {

      if (countResponse === 0) {
        // Seed the admin table with data
        adminSeeder.up(null, Admin.sequelize).then((seedResponse) => {
          console.log(`Base administrator created.`);
        });
      }
      
    });
    
    Application.count().then((countResponse) => {

      if (countResponse === 0) {
        // Seed the admin table with data
        applicationSeeder.up(null, Application.sequelize).then((seedResponse) => {
          console.log("default entries added.");
        });
      }
    
  });

  })
}).catch((err) => {
  console.log(err);
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
