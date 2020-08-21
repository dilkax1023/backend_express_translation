const express = require('express');
const exphbs = require('express-handlebars');
const translation = require('./translations.json');
// console.log(myArray);

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('home', {
		pageTitle: translation.fr.pageTitle,
		title: translation.fr.title,
	});
});

app.get('/:lang', (req, res) => {
	const lang = req.params.lang;
	const keys = Object.keys(translation);
	if (!keys.includes(lang)) {
		res.send(`
    <h1>the language you searched in not available</h1>
    `);
	}

	res.render('home', {
		pageTitle: translation[lang].pageTitle,
		title: translation[lang].title,
		flag: `http://localhost:3000/img/${lang}.png`,
	});
});

app.listen(3000);
