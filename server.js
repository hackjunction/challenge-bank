var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  bluebird = require('bluebird'),
  port = process.env.PORT || 3000;

/* Set mongoose  & global to use Bluebird promises */
global.Promise = bluebird;
mongoose.Promise = bluebird;
mongoose.connect(
  'mongodb://heroku_kpj537v3:2kb09vf00v7qd9baudppe28l7d@ds227325.mlab.com:27325/heroku_kpj537v3'
);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/* Routes */
require('./api/routes/events')(app);

/* Models */
require('./api/models/Event');

app.get('/', function(req, res) {
  res.send({
    message: 'Hello from the API'
  });
});

// React config for production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port);
console.log('Node gavel started at http://localhost:' + port);
