import readFile from '../utils/readFile';
import { simulateLanternFish } from './shared';

const input = readFile(`${__dirname}/input.txt`);
const parsedInput = input.split(',').map((number) => parseInt(number));
console.log(simulateLanternFish(parsedInput, 80));
