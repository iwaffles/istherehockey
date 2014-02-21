var request = require('request');
var cheerio = require('cheerio');

var url = 'http://www.nhl.com/ice/schedulebyday.htm?navid=nav-sch-today';

// request is async
console.log("Today's Games:");

request(url, function(err, response, body) {
	if (err)
		throw err;
	
	$ = cheerio.load(body);

	$("table.data.schedTbl tbody tr").each(function(game) {
		var home = $(this).find('.team').first().text();
		var away = $(this).find('.team').eq(1).text();
		var time = $(this).find('.time .skedStartTimeEST').text();
		var result = stripNewline(stripTags($(this).find('.tvInfo').text()));
		var string = '[' + time + ']' + home + ' vs.' + away + ' :: ' + result;
		console.log(string);
	});
});

function stripTags(str) {
	return str
			.replace(/(<(br[^>]*)>)/ig, '\n')
            .replace(/(<([^>]+)>)/ig,'');
}

function stripNewline(str) {
	return str.replace(/(\r\n|\n|\r)/gm,"");
}