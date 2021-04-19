const browserObject= require('./browser');
const scraperController = require('./pageController');
const pageScraper = require('./pageScraper');
const express = require('express');
const app = express();
var hbs = require('express-hbs');
var body_parser= require('body-parser');
// Use `.hbs` for extensions and find partials in `views/partials`.

async function  scrap(){
pageScraper.url = await 'https://geo.craigslist.org/iso/us';

//Start the browser and create a browser instance
 let browserInstance = await browserObject.startBrowser();

//// Pass the browser instance to the scraper controller
await scraperController(browserInstance);

var finalData = await pageScraper.data;
return finalData;
}

app.engine('hbs', hbs.express4({partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');



app.use(body_parser.urlencoded({extended:true}));


app.get('/',(req,res)=>{
	if(req.body=="123"){
	res.render('index',req.body);	
	}
		res.render('index');
})
app.get('/random', (req,res)=>{
	req.body="123"
	res.redirect(req.body,'/');
})
app.post('/obtenerinfo',async (req,res)=>{
	var obj= await scrap();
	res.send(obj);
})
app.listen(3000);