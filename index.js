const browserObject= require('./browser');
const scraperController = require('./pageController');
const pageScraper = require('./pageScraper');
const express = require('express');
const app = express();
const ejs= require('ejs');
var hbs = require('express-hbs');
var body_parser= require('body-parser');
// Use `.hbs` for extensions and find partials in `views/partials`.

async function  scrap(searchUrl){
pageScraper.url = await 'https://geo.craigslist.org/iso/us';
pageScraper.searchUrl=searchUrl;
//Start the browser and create a browser instance
 let browserInstance = await browserObject.startBrowser();

//// Pass the browser instance to the scraper controller
await scraperController(browserInstance);

var finalData = await pageScraper.data;
return finalData;
}

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



app.use(body_parser.urlencoded({extended:true}));


app.get('/',(req,res)=>{
			var obj= null;
		res.render('index',{obj:obj});
})
app.post('/obtenerinfo',async (req,res)=>{
	await scrap();
	var obj= await pageScraper.data;
	res.render("index",{obj:obj});
})
app.listen(3000);