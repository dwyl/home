var ampl = require('ampl');
var fs = require('fs');
var md = fs.readFileSync('./README.md', 'utf8')
// console.log(md);
var cssStyle = 'h1 { color: green; }'; // or load your style.css file
ampl.parse(md, {style: cssStyle}, function(ampHtml) {
  fs.writeFileSync('index.html', ampHtml, 'utf8');
});
