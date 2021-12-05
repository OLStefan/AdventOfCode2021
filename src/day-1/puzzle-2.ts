import readAsLines from '../utils/readAsLines';
import { countIncreases, getSegmentSums } from './functions';

const textByLine = readAsLines(`${__dirname}/input.txt`);
const numbersByLine = textByLine.map((text) => parseInt(text));
const segmentSums = getSegmentSums(numbersByLine, 3);
const increases = countIncreases(segmentSums);
console.log(increases);
