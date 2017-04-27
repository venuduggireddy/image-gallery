var assert = require("assert");
var webdriver = require("selenium-webdriver"),
  By = webdriver.By;

describe("Testing Image Gallery", function () {
  /*beforeEach(function () {
    this.browser = new webdriver.Builder()
      .withCapabilities({
        browserName: "chrome"
      }).build();

    return this.browser.get("http://localhost:8090/");
  });*/

  beforeEach(function () {
    if (process.env.SAUCE_USERNAME != undefined) {
      this.browser = new webdriver.Builder()
        .usingServer('http://' + process.env.SAUCE_USERNAME + ':' + process.env.SAUCE_ACCESS_KEY + '@ondemand.saucelabs.com:80/wd/hub')
        .withCapabilities({
          'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
          build: process.env.TRAVIS_BUILD_NUMBER,
          username: process.env.SAUCE_USERNAME,
          accessKey: process.env.SAUCE_ACCESS_KEY,
          browserName: "chrome"
        }).build();
    } else {
      this.browser = new webdriver.Builder()
        .withCapabilities({
          browserName: "chrome"
        }).build();
    }

    return this.browser.get("http://localhost:8090/");
  });

  afterEach(function () {
    return this.browser.quit();
  });


  it("List link Should be on the home page", function (done) {
    var headline = this.browser.findElement(By.id('list'));
    headline.getAttribute('id').then(function (id) {
      assert(id, "list");
      done();
    });
  });


  it("List page should display 3 png images only", function (done) {
    var headline = this.browser.findElement(By.id('list'));
    headline.click();
    this.browser.findElements(By.tagName('img')).then(function (imgs) {
      // console.log('Found #', imgs.length, 'images');
      assert.equal(3, imgs.length);
      done();
    });

  });

});

