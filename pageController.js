const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance){
	let browser;
	try{
	browser= await browserInstance;
	await pageScraper.scraper(browser);
	console.log(pageScraper.scraperObject.data);

	}catch(err){
	console.log(err);
	}
}
module.exports = (browserInstance) => scrapeAll(browserInstance);
