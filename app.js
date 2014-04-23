var express = require('express');
var app 	= express();
var hockey 	= require('./hockey.js');
var ejs 	= require('ejs');

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/index.json', function(req, res) {
	var games = hockey.fetchTodaysGames(function(data) {
		res.json(data);
	});
});

app.get('/:var(|index.html)', function(req, res) {
	var games = hockey.fetchTodaysGames(function(data) {
		res.render('index', {"games": data});
	});
});

var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
