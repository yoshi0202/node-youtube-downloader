
/*
 * This is just a placeholder for making sure I have stuff working before I put
 * proper testing in place. And yes, I understand that I am _wrong_ to be deferring proper
 * testing. I apologise in advance.
 * 
 * TODO Modify testing using cucumber.
 */

const Gn = require('../lib/gracenote');
const conf = require ('./config.json');

var api = new Gn (conf.apiKey);

api.programs.search ("US of Tara").then (function (resp) {
    console.log (JSON.stringify(resp, null, 2));
});
