import readAsLines from '../utils/readAsLines';
import { countIncreases, getSegmentSums } from './shared';

const input = readAsLines(`${__dirname}/input.txt`);
const parsedInput = input.map((text) => parseInt(text));
const segmentSums = getSegmentSums(parsedInput, 3);
const increases = countIncreases(segmentSums);
console.log(increases);
