var express = require('express');
var app = express();
var hockey = require('./hockey.js');

app.get('/', function(req, res) {
	res.send('hello world');
});

app.listen(3000);
console.log('Listening on port 3000');