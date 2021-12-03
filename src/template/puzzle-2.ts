import fs from 'fs';

const text = fs.readFileSync(`${__dirname}/input.txt`).toString().trim();
const textByLine = text.split('\n');
