var express = require('express');
var app = express();

var port = process.env.PORT || 8080;
var path = require("path");

var sslRedirect = require('heroku-ssl-redirect');
var compression = require('compression');

var sendmail = require('sendmail')();

app.use(compression());
app.use(sslRedirect(['staging', 'production']));

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port);
