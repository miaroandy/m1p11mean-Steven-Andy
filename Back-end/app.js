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
var db = require('./utils/db');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    const authorizationHeader = req.headers['authorization'];

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        const token = authorizationHeader.split(' ')[1];
        req.token = token;
    }
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employe', employeRouter);
app.use('/services', servicesRouter);
app.use('/depenses', depensesRouter);
app.use('/login', loginRouter);

module.exports = app;
