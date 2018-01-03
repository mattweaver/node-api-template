var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

var routes = require("./routes.js")(app);
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});

var port = process.env.PORT || 3000;
app.use('/api', routes);

app.listen(port, function() {
    console.log('API Listening on port ' + port + '...')
    console.log('Send api requests to: http://<server>:' + port + '/api/<route>')
});