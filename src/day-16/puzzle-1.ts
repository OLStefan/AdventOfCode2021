import readFile from '../utils/readFile';
import { parseHexString, parsePacket, sumVersions } from './shared';

const input = readFile(`${__dirname}/input.txt`);
const binary = parseHexString(input);
const parseRoot = parsePacket(binary, sumVersions);
console.log(parseRoot.value + parseRoot.version);
