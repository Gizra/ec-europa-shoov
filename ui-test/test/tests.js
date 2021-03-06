'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
var capsConfig = {
  'chrome': {
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },
  'ie11': {
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  }
}

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://ec.europa.eu/';

describe('Live testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the home page',function(done) {
    client
      .url(baseUrl + '/index_en.htm')
      .webdrivercss(testName, {
        name: 'homepage',
        exclude:
          [
            '.grid-3-of-3 .spec-highlight',
            '.grid-3-of-3 .text-highlight',
            '.group .block-priority',
            '.block-news p',
            '.block-news .spc',
          ],
        remove:
          [
            '.block-news h3',
            '.block-news a .block-text',
          ]
      },shoovWebdrivercss.processResults)
      .call(done);
  });

  it('should show the news page',function(done) {
    client
      .url(baseUrl + '/news/2015/07/20150713_en.htm')
      .webdrivercss(testName, {
        name: 'news',
        remove:
          [
            '.text-block-info ul',
          ]
      },shoovWebdrivercss.processResults)
      .call(done);
  });
});
