var request = require('request');
var cheerio = require('cheerio');

var url = 'http://www.nhl.com/ice/schedulebyday.htm?navid=nav-sch-today';

exports.fetchTodaysGames = function(callback) {
	// request is async
	console.log("Today's Games:");

	request(url, function(err, response, body) {
		if (err)
			throw err;
		
		$ = cheerio.load(body);

		var games = [];

		$("table.data.schedTbl tbody tr").each(function(game) {
			var home = $(this).find('.team').first().text().trim();
			var away = $(this).find('.team').eq(1).text().trim();
			var time = $(this).find('.time .skedStartTimeEST').text().trim();
			var result = stripNewline(stripTags($(this).find('.tvInfo').text())).trim();
			var string = '[' + time + ']' + home + ' vs.' + away + ' :: ' + result;
			// console.log(string);

			games.push({
				"home":home,
				"away":away,
				"time":time,
				"result":result
			});
		});
		console.log('done!');
		// callback here
		callback(games);
	});
}

function stripTags(str) {
	return str
			.replace(/(<(br[^>]*)>)/ig, '\n')
            .replace(/(<([^>]+)>)/ig,'');
}

function stripNewline(str) {
	return str.replace(/(\r\n|\n|\r)/gm,"");
}