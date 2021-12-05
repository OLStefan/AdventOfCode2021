import readAsLines from '../utils/readAsLines';
import { countBits } from './functions';

function filterLinesByBit(lines: string[], moreOnes: string, lessOnes: string) {
	const places = lines[0]!.length;
	let filteredLines = lines;
	for (let i = 0; i < places; i++) {
		if (filteredLines.length === 1) {
			break;
		}

		const counts = countBits(filteredLines);
		const { ones, zeroes } = counts[i]!;
		const moreOrEqualOnes = ones >= zeroes;

		if (moreOrEqualOnes) {
			filteredLines = filteredLines.filter((line) => line[i] === moreOnes);
		} else {
			filteredLines = filteredLines.filter((line) => line[i] === lessOnes);
		}
	}

	return filteredLines;
}

function filterLinesByMostBit(lines: Array<string>) {
	return filterLinesByBit(lines, '1', '0')[0]!;
}
function filterLinesByLeastBit(lines: Array<string>) {
	return filterLinesByBit(lines, '0', '1')[0]!;
}

const textByLine = readAsLines(`${__dirname}/input.txt`);
const ox = filterLinesByMostBit(textByLine);
const co = filterLinesByLeastBit(textByLine);
const oxNumber = parseInt(ox, 2);
const coNumber = parseInt(co, 2);
console.log(oxNumber * coNumber);
