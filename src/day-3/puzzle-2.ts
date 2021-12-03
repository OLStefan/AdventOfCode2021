import fs from 'fs';

const text = fs.readFileSync(`${__dirname}/input.txt`).toString().trim();
const textByLine = text.split('\n');

function countOnes(lines: string[], index: number) {
	return lines.filter((line) => line[index] === '1').length;
}

function filter(lines: string[], moreOnes: string, lessOnes: string) {
	const places = lines[0]!.length;
	let filteredLines = lines;
	for (let i = 0; i < places; i++) {
		if (filteredLines.length === 1) {
			break;
		}

		const ones = countOnes(filteredLines, i);
		const moreOrEqualOnes = ones >= filteredLines.length / 2;

		if (moreOrEqualOnes) {
			filteredLines = filteredLines.filter((line) => line[i] === moreOnes);
		} else {
			filteredLines = filteredLines.filter((line) => line[i] === lessOnes);
		}
	}

	return filteredLines;
}

const ox = filter(textByLine, '1', '0')[0]!;
const co = filter(textByLine, '0', '1')[0]!;
const oxNumber = parseInt(ox, 2);
const coNumber = parseInt(co, 2);

console.log(oxNumber * coNumber);
