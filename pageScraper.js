const scraperObject = {
	url: 'https://rochester.craigslist.org/cpg/d/perkinsville-looking-for-partner-in-my/7262443714.html',
async scraper(browser){
let page= await browser.newPage();
	console.log(this.url);
	await page.goto(this.url); 
}}
module.exports = scraperObject;
