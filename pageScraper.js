const cliProgress = require('cli-progress');
const scraperObject = {
	url:null,
	searchUrl:null,
	async scraper(browser){
		let page= await browser.newPage();
		console.log(this.url);
		await page.goto(this.url,{waitUntil : 'networkidle2' }).catch(e => void 0); 
		//select every link in the geo site page, so we can add the search/cpg?is_paid=yes(this work for looking for paid jobsS)
		await page.waitForSelector('.geo-site-list');
		
		let urls = await page.$$eval('section  ul > li' , links => {
			links = links.map( el => el.querySelector('a').href + 'search/cpg?is_paid=yes');
			return links;
		});
		//this is a function that get a link parrameter so we can process it
		let pagePromise = (link)=> new Promise(async(resolve,reject) =>{
		let dataObj = {};
		let newPage = await browser.newPage();

		await newPage.goto(link,{waitUntil : 'networkidle2' }).catch(e => void 0);

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
		//here is where we use the pagePromis function in a for cycle so we can get the information one at a time
		
		const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
		bar1.start(urls.length, 0);
		var count = 1;
		for (link in urls){
		bar1.update(count++); 
		let currentPageData = await pagePromise(urls[link]);
		this.data.push(currentPageData);	
			}
			console.log(this.data['gigTitle']);
	},
	data:[]
}
	
module.exports = scraperObject;
