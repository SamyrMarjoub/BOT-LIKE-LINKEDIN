import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
dotenv.config();
let continueLiking = true;

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.goto("https://www.linkedin.com/home");
    await page.setViewport({ width: 1024, height: 1024 });
    const selector = ".text-input input";
    await page.waitForSelector(selector);
    await page.type(selector, process.env.EMAIL);
    await page.type("#session_password", process.env.SENHA);
    await page.click(".sign-in-form__submit-btn--full-width");
    
    const btn = "[data-test-icon='thumbs-up-outline-medium']";
    await page.waitForSelector(btn);
    
    let continueLiking = true;
    
    async function likes() {
      const elements = await page.$$(btn);
    
      // clique em cada elemento encontrado
      for (const element of elements) {
        await element.click();
        await page.waitForTimeout(2000); // espera 2 segundos entre cada clique
      }
    
      // role a página para baixo
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
    
      await page.waitForTimeout(2000); // espera 2 segundos antes de executar o loop novamente
    }
    
    while (continueLiking) {
      await likes();
    }
    
})();

