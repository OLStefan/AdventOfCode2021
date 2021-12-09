import readAsLines from '../utils/readAsLines';
import { countIncreases } from './shared';

const input = readAsLines(`${__dirname}/input.txt`);
const parsedInput = input.map((text) => parseInt(text));
const increases = countIncreases(parsedInput);
console.log(increases);
