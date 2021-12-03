import fs from 'fs';

const text = fs.readFileSync(`${__dirname}/input.txt`).toString();
const textByLine = text.split('\n');

const length = textByLine[0]!.length;

const gamma: string[] = [];
const epsilon: string[] = [];

for (let i = 0; i < length; i++) {
	let zeroes = 0;
	let ones = 0;
	for (let j = 0; j < textByLine.length; j++) {
		const char = textByLine[j]!.charAt(i);
		if (char === '0') {
			zeroes++;
		} else {
			ones++;
		}
	}

	console.log(zeroes, ones);

	if (ones >= zeroes) {
		gamma.push('1');
		epsilon.push('0');
	} else {
		gamma.push('0');
		epsilon.push('1');
	}
}

const epislonNumber = parseInt(epsilon.join(''), 2);
const gammeNumber = parseInt(gamma.join(''), 2);

console.log(epislonNumber * gammeNumber);
