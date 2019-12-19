global.expect = require('unexpected');
global.sinon = require('sinon');

const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const {window} = new JSDOM('<body><div id="test-container"></div></body>', {
  pretendToBeVisual: true
});
const document = window.document;

global.JSDOM = JSDOM;
global.window = window;
global.testContainer = document.getElementById('test-container');

// Range mock
const Range = global.Range = function Range() {};
Range.prototype.createContextualFragment = html => JSDOM.fragment(html);

document.createRange = () => new Range();

const exposeToGlobal = [
  'document',
  'CustomEvent',
  'DocumentFragment',
  'EventTarget',
  'NodeList',
];
exposeToGlobal.forEach((prop) => {
  global[prop] = window[prop];
});

global.simulant = require('simulant');
