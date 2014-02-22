var express = require('express');
var app = express();
var hockey = require('./hockey.js');

app.get('/index.json', function(req, res) {
	var games = hockey.fetchTodaysGames(function(data) {
		res.json(data);
	});
});

app.get('/index.html', function(req, res) {
	var games = hockey.fetchTodaysGames(function(data) {
		res.send(data);
	});
});

app.listen(3000);
console.log('Listening on port 3000');
