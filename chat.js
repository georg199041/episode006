var http = require('http'),
	sys = require('util'),
	fs = require('fs'),
	ws = require('ws');


var clients = [];

http.createServer(function(request, response) {
	response.writeHead(200, {
		'Content-Type': 'text/html'
	});

	var rs = fs.createReadStream(__dirname + '/template.html');

	sys.pump(rs, response);

}).listen(4000);

ws.createServer(function(websocket) {

	websocket.on('connect', function(resource) {
		clients.push(websocket);
		websocket.write('Welcome');
	});

	websocket.on('data', function(data) {
		clients.forEach(function(clent) {
			client.write(data);
		});
	});

	websocket.on('close', function() {
		var pos = clients.indexOf(websocket);
		if (pos >= 0) {
			clients.splice(pos, 1);
		}
	});
	
}).listen(8080);

