'use strict';
require('fa-base/console-color');
console.clear();
global.handleError = (e, res) => {
	const { name, message } = e;
	res.status(500).json({ name, message });
};
const express = require('express');
// const compression = require('compression');
const bodyParser = require('body-parser');
/*app*/
global.app = express();
const port = 3000;
const timeout = 60 * 60000;
app.set('port', process.env.PORT || port);
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use((req, res, next) => {
	res.setTimeout(timeout, () => {
		throw new Error(`timed out: ${timeout / 1000 / 60}m`);
	});
	next();
});
app.use(express.static(__dirname + './../public'));
app.use(express.static(__dirname + './../app'));
/**/
require('./html');
// require('./v1');
app.listen(port, () =>
	console.message(`listening: ${port}`),
);
