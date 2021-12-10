import readAsLines from '../utils/readAsLines';
import { findCorruptedCharacter } from './shared';

function filterCorruptedLines(lines: Array<string>) {
	return lines.filter((line) => !findCorruptedCharacter(line));
}

function findMissingChars(line: string) {
	return line.split('').reduce((chars, current) => {
		const newChars = [...chars];
		switch (current) {
			case '(':
				newChars.unshift(')');
				break;
			case '[':
				newChars.unshift(']');
				break;
			case '{':
				newChars.unshift('}');
				break;
			case '<':
				newChars.unshift('>');
				break;
			default: {
				newChars.shift();
			}
		}
		return newChars;
	}, [] as Array<string>);
}

function findAllMissingByLine(lines: Array<string>) {
	return lines.map(findMissingChars);
}

function result(missingChars: Array<Array<string>>) {
	const points: Record<string, number> = {
		')': 1,
		']': 2,
		'}': 3,
		'>': 4,
	};

	const results = missingChars.map((line) => line.reduce((result, current) => result * 5 + (points[current] ?? 0), 0));
	results.sort((a, b) => b - a);

	return results[(results.length - 1) / 2]!;
}

const input = readAsLines(`${__dirname}/input.txt`);
const notCorruptedLines = filterCorruptedLines(input);
const missingChars = findAllMissingByLine(notCorruptedLines);
console.log(result(missingChars));
