var express = require('express'); // bring in express
var app = express(); // app is an instance of express
var bodyParser = require('body-parser'); // express is an extremely minimalist framework so we need body-parser to help us handle req.body
var mongoose   = require('mongoose');

// pull correct settings per environment
var config = require('./app/config/config.js');
var environmentSettings = config.config();

app.use(express.static(__dirname + '/public'));

// connect to MongoDB
mongoose.connect(environmentSettings.db);
// listen for connection errors
mongoose.connection.on('error', function(error) {
  console.error('Could not connect to MongoDB b/c:', error);
});

// configure body-parser so we can work with request.body
app.use(bodyParser.urlencoded({ extended: true })); // handle urleconded bodies; extended true means in any form (not just key-value pairs)
app.use(bodyParser.json()); // only parsing json

// this is the entry way into the client-side
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// bring in API routes
var apiRouter = require('./app/config/routes');

// apply router middleware
// and give a namespace
app.use('/api', apiRouter);

// listen to port as defined or default 3000
var port = process.env.PORT || 3000;

app.listen(port); // tell the app to listen on port 3000

console.log('Server is running on port 3000');