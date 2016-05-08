var express = require('express'),
	app = express(),
	api = require('./api.js');

app
	.use(express.static('./app/'))
	.use('/api/', api)
	.get('*', function(req, res) {
		res.sendFile(__dirname + '/app/index.html');
	})
	.listen(3005);
console.log('Server is running on port 3005');