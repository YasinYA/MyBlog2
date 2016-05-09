var express = require('express'),
	app = express(),
	api = require('./api.js');

app.set('port', process.env.port || 3004);
app
	.use(express.static('./app/'))
	.use('/api/', api)
	.get('*', function(req, res) {
		res.sendFile(__dirname + '/app/index.html');
	})
	.listen(app.get('port'), function() {
		console.log('Server is running on http://localhost:' + app.get('port') + '; Press Ctrl to terminate');
	});