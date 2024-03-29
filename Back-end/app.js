var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
require('dotenv').config();
var logger = require('morgan');
const cors = require('cors');
const cron = require('node-cron');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeRouter = require('./routes/employe');
var servicesRouter = require('./routes/services');
var loginRouter = require('./routes/Auth');
var depensesRouter = require('./routes/depenses');
var clientRouter = require('./routes/client');
var rdvRouter = require('./routes/rdv');
var statsRouter = require('./routes/stats');
var payementRouter= require('./routes/Payement');
var managerRouter=require('./routes/manager');
var db = require('./utils/db');
const Cron = require('./utils/cron');

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
app.use('/payement', payementRouter);
app.use('/admin', managerRouter);

cron.schedule('0 10 * * *', async () => {
    Cron.createCron();
});

module.exports = app;
