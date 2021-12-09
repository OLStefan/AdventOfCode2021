import readFile from '../utils/readFile';
import { getBestTargetPosition, getFuelUsageBasicDiff, groupCrabs } from './shared';

const input = readFile(`${__dirname}/input.txt`);
const parsedInput = input.split(',').map((number) => parseInt(number));
const [crabs, maxPosition] = groupCrabs(parsedInput);
console.log(getBestTargetPosition(crabs, maxPosition, getFuelUsageBasicDiff));
