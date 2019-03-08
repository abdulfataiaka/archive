const fs = require('fs');
const Parser = require('../lib/parser');

const root = '/Users/andeladeveloper/Desktop/Light/Softwares/htmod/testapp';
const html = fs.readFileSync(`${root}/index.html`);
const parser = new Parser(html);

// ++ determine json content
let content;
if (parser.error.is()) {
  content = parser.error.trace;
}

else {
  content = parser.struct;
}

// ++ write content to json file
fs.writeFileSync(`${root}/new.json`, JSON.stringify(content));
