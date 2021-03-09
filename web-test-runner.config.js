/* eslint-env node */
const { createSauceLabsLauncher } = require('@web/test-runner-saucelabs');
const { webdriverLauncher } = require('@web/test-runner-webdriver');

const config = {
  browserStartTimeout: 1000 * 60 * 4,
  testsStartTimeout: 1000 * 60 * 4,
  testsFinishTimeout: 1000 * 60 * 4,
  nodeResolve: true,
  coverageConfig: {
    include: ['**/src/*'],
    threshold: {
      statements: 99,
      branches: 88,
      functions: 100,
      lines: 99
    }
  }
};

if (process.env.TEST_ENV === 'sauce') {
  const sauceLabsLauncher = createSauceLabsLauncher({
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY
  });

  const sharedCapabilities = {
    'sauce:options': {
      name: 'vaadin-checkbox unit tests',
      build: `${process.env.GITHUB_REF || 'local'} build ${process.env.GITHUB_RUN_NUMBER || ''}`
    }
  };

  config.concurrency = 2;
  config.browsers = [
    sauceLabsLauncher({
      ...sharedCapabilities,
      browserName: 'firefox',
      platform: 'Windows 10',
      browserVersion: 'latest'
    }),
    sauceLabsLauncher({
      ...sharedCapabilities,
      browserName: 'safari',
      platform: 'macOS 10.15',
      browserVersion: '13.1'
    })
  ];
}

if (process.env.TEST_ENV === 'ios') {
  config.concurrency = 1;
  config.browsers = [
    webdriverLauncher({
      port: 4723,
      path: '/wd/hub/',
      capabilities: {
        // The defaults you need to have in your config
        browserName: 'safari',
        platformName: 'iOS',
        // For W3C the appium capabilities need to have an extension prefix
        // This is `appium:` for all Appium Capabilities which can be found here
        // http://appium.io/docs/en/writing-running-appium/caps/
        'appium:deviceName': 'iPhone 12',
        'appium:platformVersion': '14.3',
        'appium:orientation': 'PORTRAIT',
        'appium:automationName': 'XCUITest',
        'appium:newCommandTimeout': 240
      }
    })
  ];
}

module.exports = config;
