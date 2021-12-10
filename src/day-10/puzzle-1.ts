import readAsLines from '../utils/readAsLines';
import { findCorruptedCharacter } from './shared';

function findCorruptedCharacters(lines: Array<string>) {
	return lines.map(findCorruptedCharacter).filter((char): char is string => !!char);
}

function result(corruptedChars: Array<string>) {
	const points: Record<string, number> = {
		')': 3,
		']': 57,
		'}': 1197,
		'>': 25137,
	};

	return corruptedChars.reduce((sum, current) => sum + (points[current] ?? 0), 0);
}

const input = readAsLines(`${__dirname}/input.txt`);
const corruptedChars = findCorruptedCharacters(input);
console.log(result(corruptedChars));
