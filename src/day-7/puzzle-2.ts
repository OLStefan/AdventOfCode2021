import readFile from '../utils/readFile';
import { getBestTargetPosition, getFuelUsageGausianSum, groupCrabs } from './functions';

const input = readFile(`${__dirname}/input.txt`);
const parsedInput = input.split(',').map((number) => parseInt(number));
const [crabs, maxPosition] = groupCrabs(parsedInput);
console.log(getBestTargetPosition(crabs, maxPosition, getFuelUsageGausianSum));
