var http = require('http');
var fs = require('fs');

console.log('Searching...');

var targetUrl = process.argv[2];
var word1 = process.argv[3];
var word2 = process.argv[4];

var word1RegEx = new RegExp(word1,'g');

var options = {
	host:targetUrl,
	port:80,
	path:'/'
};

http.get(options, function(resp){
	resp.setEncoding('utf8');
	var sourceHtml = '';
	resp.on('data',function(chunk){		
		sourceHtml += chunk;				
	});
	resp.on('end',function(){
		var count = (sourceHtml.match(word1RegEx)).length;
		console.log('Number of occurrences of ' + word1 + ': ' + count);
		sourceHtml = sourceHtml.replace(word1RegEx,word2);
		console.log('Replaced all instances of ' + word1 + ' with ' + word2);
		fs.writeFile('./'+ targetUrl+'.html',sourceHtml, function(err){
			if (err) {
				console.log('Write error: ' + err.message);
			} else {
				console.log('New file saved as ' + targetUrl + '.html');
			}
		});
	});	
}).on('error',function(err){
	console.log('Get error: ' + err.message);
});
