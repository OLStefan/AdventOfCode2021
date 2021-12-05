import readAsLines from '../utils/readAsLines';
import { filterLinesByBit } from './functions';

function filterLinesByMostBit(lines: Array<string>) {
	return filterLinesByBit(lines, '1', '0')[0]!;
}
function filterLinesByLeastBit(lines: Array<string>) {
	return filterLinesByBit(lines, '0', '1')[0]!;
}

const input = readAsLines(`${__dirname}/input.txt`);
const ox = filterLinesByMostBit(input);
const co = filterLinesByLeastBit(input);
const oxNumber = parseInt(ox, 2);
const coNumber = parseInt(co, 2);
console.log(oxNumber * coNumber);
