const fs = require('fs');
const content = fs.readFileSync('c:/Users/User/Desktop/My app/county cargo/src/app/dashboard/admin/importer/page.tsx', 'utf8');
let openBraces = 0;
let closeBraces = 0;
let openParens = 0;
let closeParens = 0;

for (let i = 0; i < content.length; i++) {
    if (content[i] === '{') openBraces++;
    if (content[i] === '}') closeBraces++;
    if (content[i] === '(') openParens++;
    if (content[i] === ')') closeParens++;
}

console.log(`Braces: { ${openBraces}, } ${closeBraces}, diff: ${openBraces - closeBraces}`);
console.log(`Parens: ( ${openParens}, ) ${closeParens}, diff: ${openParens - closeParens}`);
