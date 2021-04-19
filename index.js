const browserObject= require('./browser');
const scraperController = require('./pageController');
const pageScraper = require('./pageScraper');
const express = require('express');
const app = express();
async function  scrap(){
//Start the browser and create a browser instance
 let browserInstance = await browserObject.startBrowser();

//// Pass the browser instance to the scraper controller
await scraperController(browserInstance);

var finalData = await pageScraper.data;
}

app.get('/',(req,res)=>{
	scrap();
	res.send('hola mundo');	
})

app.listen(3000);