'use strict';
const fs = require('fs');
const { TwingEnvironment, TwingLoaderArray } = require('twing');
const path = `${__dirname}/../public/html`;
const twig_html = {
	// 'index': fs.readFileSync(`${__dirname}/html/index.twig`).toString(),
	'index': fs.readFileSync(`${path}/index.twig`).toString(),
	'menu': fs.readFileSync(`${path}/menu.twig`).toString(),
	'head': fs.readFileSync(`${path}/head.twig`).toString(),
};
const links = [
	// 'test',
];
links.forEach(function(item) {
	twig_html[item] = fs.readFileSync(`${__dirname}/html/${item}.twig`).toString();
});
const twig = new TwingEnvironment(new TwingLoaderArray(twig_html));
app.get('/', async (req, res) => {
	const menu = await twig.render('menu', { links });
	const head = await twig.render('head');
	twig.render('index', {
		head,
		menu,
		title: 'main page',
	}).then((output) => {
		res.send(output);
	});
});
