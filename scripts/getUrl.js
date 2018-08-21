const parse = require('git-url-parse');
const ghUrl = process.argv[2];
const parsedUrl = parse(ghUrl);

const ghPagesUrl = 'https://' + parsedUrl['owner'] + '.github.io/' + parsedUrl['name'];
console.log(ghPagesUrl);