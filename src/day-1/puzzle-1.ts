import readAsLines from '../utils/readAsLines';
import { countIncreases } from './functions';

const textByLine = readAsLines(`${__dirname}/input.txt`);
const numbersByLine = textByLine.map((text) => parseInt(text));
const increases = countIncreases(numbersByLine);
console.log(increases);
