// BASE SETUP
// ================================================================
var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var morgan = require('morgan');

var mongoose = require('mongoose');

var config = require('./config');

var path = require('path');

// APP CONFIGURATION
// ================================================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// config our app to handle Cross Origin Resource Sharing requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// log all request to the console
app.use(morgan('dev'));

mongoose.connect(config.database);

// set static file location for request that our frontend will make
app.use(express.static(__dirname + '/public'));

// ROUTES FOR OUR API
// ================================================================
var apiRouter = require('./app/routes/api')(app, express);

app.use('/api', apiRouter);

// MAIN CATCHALL ROUTE - SEND USER TO FRONTEND
// ================================================================
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
})

// START THE SERVER
// ================================================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
