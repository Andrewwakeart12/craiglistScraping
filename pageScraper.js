const scraperObject = {
	url: 'https://geo.craigslist.org/iso/us',
	async scraper(browser){
		let page= await browser.newPage();
		console.log(this.url);
		await page.goto(this.url); 

		await page.waitForSelector('.geo-site-list');
		let urls = await page.$$eval('section  ul > li' , links => {
			links = links.map ( el => el.querySelector('a').href + 'search/cpg?is_paid=yes')
			return links;
		});

		let pagePromise = (link)=> new Promise(async(resolve,reject) =>{
		let dataObj = {};
		let newPage = await browser.newPage();
		await newPage.goto(link);
		dataObj['gigTitle'] = await newPage.$eval('ul >.result-row > .result-info > h3 >  a', text => text.content);

			resolve(dataObj);
			await newPage.close();
		});
		for (link in urls){
		let currentPageData = await pagePromise(urls[link]);
			console.log(currentPageData);
		}
	}}
module.exports = scraperObject;
