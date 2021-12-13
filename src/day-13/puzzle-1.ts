import readAsLines from '../utils/readAsLines';
import { getPointsAndFolding, getRemainingPoints } from './shared';

const input = readAsLines(`${__dirname}/input.txt`);
const { points, folds } = getPointsAndFolding(input);
const remaning = getRemainingPoints(points, [folds[0]!]);
console.log(remaning.length);
