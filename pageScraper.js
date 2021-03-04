const scraperObject = {
	url: 'https://geo.craigslist.org/iso/us',
	async scraper(browser){
		let page= await browser.newPage();
		console.log(this.url);
		await page.goto(this.url,{waitUntil : 'networkidle2' }).catch(e => void 0); 

		await page.waitForSelector('.geo-site-list');
		let urls = await page.$$eval('section  ul > li' , links => {
			links = links.map ( el => el.querySelector('a').href + 'search/cpg?is_paid=yes')
			return links;
		});

		let pagePromise = (link)=> new Promise(async(resolve,reject) =>{
		let dataObj = {};
		let newPage = await browser.newPage();
		await newPage.goto(link,{waitUntil : 'networkidle2' }).catch(e => void 0);
		dataObj['gigTitle'] = await newPage.$$eval('ul >.result-row > .result-info > h3', link => {
			link = link.map(el => el.querySelector('a').href);
			
			return link;
		})

		
	await		resolve(dataObj);
			await newPage.close();
		});
		for (link in urls){ 
		let currentPageData = await pagePromise(urls[link]);
			console.log(currentPageData);
		}
	}}
module.exports = scraperObject;
