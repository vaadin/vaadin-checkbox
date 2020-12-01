module.exports = {
  browsers: {
    chrome: {
      baseUrl: 'http://localhost:8080/test/visual/',
      screenshotsDir: (test) => {
        const folder = test.title.replace(/-(lumo|material)(-)?(rtl|ltr)?/, '');
        return `test/visual/screens/${folder}`;
      },
      desiredCapabilities: {
        browserName: 'chrome',
        version: '85.0',
        platform: 'Windows 10'
      }
    }
  },
  plugins: {
    'hermione-esm': {
      port: 8080
    },
    'hermione-sauce': {
      verbose: false
    }
  }
};
