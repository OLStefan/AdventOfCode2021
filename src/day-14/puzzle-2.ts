import { result } from 'lodash';
import readAsLines from '../utils/readAsLines';
import { getPairsAndRules, simulateSteps } from './shared';

const input = readAsLines(`${__dirname}/input.txt`);
const { pairs, rules } = getPairsAndRules(input);
const product = simulateSteps({ pairs, rules }, 40);
console.log(result(product, input[0]!.split('').pop()!));
