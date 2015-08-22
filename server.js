var express = require('express'); //express module
var app = express(); //defining app as instance of express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./app/config/config');
var environmentSettings = config();

mongoose.connect('menvironmentSettings.db'); //mongodb protocol connecting to mongodb port, to mongodb database app 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // just deal with json

var apiRouter = require('./app/config/routes');

app.use('/api', apiRouter);

app.listen(3000);

console.log('server is running on port 3000');