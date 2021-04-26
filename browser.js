const puppeteer = require('puppeteer');

async function startBrowser(){
let browser;
	try{
	browser= await puppeteer.launch({
		headless:true,
		args: ["--disable-setuid-sandbox"],
		'ignoreHTTPSErrors':true,
		executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe'
		});
	}catch (err){
		console.log(err);
	}
	return browser;
}
module.exports={
startBrowser
}
