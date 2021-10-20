const puppeteer = require("puppeteer");

let browser, page;

test("testing", () => {
    const sum = 1 + 3
    expect(sum).toEqual(4)

    // assert();
})

beforeEach(async() => {
    browser = await puppeteer.launch({
        headless: false
    });

    page = await browser.newPage();

    // console.log(page);
    await page.goto("http://localhost:3000/")
})

afterEach(async () => {
    await browser.close();
})

test("launch chromium", async () => {
   

    const text = await page.$eval('h1', (el) => el.innerHTML);

    const url = await page.url();
    console.log(url);
    
    // console.log(text);
    await expect(text).toEqual('testing text');
})