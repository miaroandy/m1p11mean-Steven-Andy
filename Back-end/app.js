var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
require('dotenv').config();
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeRouter = require('./routes/employe');
var servicesRouter = require('./routes/services');
var loginRouter = require('./routes/Auth');
var depensesRouter = require('./routes/depenses');
var clientRouter = require('./routes/client');
var rdvRouter = require('./routes/rdv');
var statsRouter = require('./routes/stats');
var db = require('./utils/db');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employe', employeRouter);
app.use('/services', servicesRouter);
app.use('/depenses', depensesRouter);
app.use('/login', loginRouter);
app.use('/client', clientRouter);
app.use('/rdv', rdvRouter);
app.use('/stats', statsRouter);

module.exports = app;
