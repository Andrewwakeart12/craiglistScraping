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
		await newPage.waitForTimeout(5000);
		await newPage.goto(link);
		dataObj['gigTitle'] = await newPage.$$eval('ul >.result-row > .result-info > h3', link => {
			link = link.map(el => el.querySelector('a').href);
			
			return link;
		});
		dataObj['gigTime']= await newPage.$$eval('ul >.result-row > .result-info .result-date', text => {

			text=text.map(el => el.textContent);
			return text;
		}); 

			await resolve(dataObj);
			await newPage.close();
		});
		for (link in urls){ 
		let currentPageData = await pagePromise(urls[link]);
			console.log(currentPageData);
		}
	}}
module.exports = scraperObject;
