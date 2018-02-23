const {toMatchImageSnapshot} = require('jest-image-snapshot');
const puppeteer = require('puppeteer');
const exec = require('child_process').exec;

expect.extend({toMatchImageSnapshot});

describe('vaadin-checkbox visual tests with jest-image-snapshot and puppeteer', () => {
  let browser;
  let page;
  let polymerServeUrl;

  // Run polymer serve
  beforeAll(done => {
    const polymerServeProcess = exec('polymer serve');
    polymerServeProcess.stdout.on('data', data => {
      polymerServeUrl = data.match(/reusable components: (.*)/)[1];
      done();
    });
  });

  // Run headless Chrome
  beforeEach(async() => {
    browser = await puppeteer.launch({
      // debug mode, uncomment this to see the browser
      // headless: false
    });
    page = await browser.newPage();
  });

  const matchComponentDemo = async() => {
    const componentDemoHandle = await page.$('vaadin-component-demo');
    const image = await componentDemoHandle.screenshot();
    expect(image).toMatchImageSnapshot();
  };

  it('basic demos', async() => {
    await page.goto(`${polymerServeUrl}demo/#checkbox-basic-demos`);
    await matchComponentDemo();
  });

  it('indeterminate demos', async() => {
    await page.goto(`${polymerServeUrl}demo/#checkbox-indeterminate-demos`);
    await matchComponentDemo();
  });

  // Close headless Chrome
  afterEach(async() => {
    await browser.close();
  });

  // polymer serve will be terminated automatically with the --forceExit flag of jest
});
