import readAsLines from '../utils/readAsLines';
import { countOverlaps, mapVents, readVents } from './shared';

const input = readAsLines(`${__dirname}/input.txt`);
const points = readVents(input);
const ventMap = mapVents(points, true);
console.log(countOverlaps(ventMap));
