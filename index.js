var fs = require('fs');
var http_request = require('./http_request');
var cheerio = require('cheerio');

// Adding Colors to Terminal *Without* a Library/Module
var bgRedBlack = '\x1b[41m\x1b[30m';
var bgGreenBlack = '\x1b[42m\x1b[30m';
var RESET = '\x1b[0m'; // see: https://stackoverflow.com/a/41407246/1148249
var URL = 'https://github.com/nelsonic/home/blob/master/README.md';

http_request(URL, function (status, html) {
  if (status !== 200 || !html) {
    console.log(bgRedBlack,
        " - - - GitHub Scraper FAIL >> " + URL + "  - - - ", RESET);
    process.exit();
  }
  else {
    var $ = cheerio.load(html);
    var body = $('#readme').html()
    var css = fs.readFileSync('./index.css', 'utf8');
    var template = fs.readFileSync('./template.html', 'utf8');
    var out = template.replace('{css}', css).replace('{content}', body);
    fs.writeFileSync('./index.html', out, 'utf8');
    console.log(bgGreenBlack, 'done.', RESET);
  }
});
