import readFile from '../utils/readFile';
import { parseHexString, parsePacket, valueByOperation } from './shared';

const input = readFile(`${__dirname}/input.txt`);
const binary = parseHexString(input);
const parseRoot = parsePacket(binary, valueByOperation);
console.log(parseRoot.value);
