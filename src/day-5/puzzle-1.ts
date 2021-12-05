import readAsLines from '../utils/readAsLines';
import { countOverlaps, mapVents, readVents } from './functions';

const textByLine = readAsLines(`${__dirname}/input.txt`);
const points = readVents(textByLine);
const ventMap = mapVents(points);
console.log(countOverlaps(ventMap));
