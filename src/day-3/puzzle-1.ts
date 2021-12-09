import readAsLines from '../utils/readAsLines';
import { countBits } from './shared';

function getMostBits(lines: Array<string>) {
	const counts = countBits(lines);

	return counts.reduce((prev, curr) => {
		if (curr.ones >= curr.zeroes) {
			return `${prev}1`;
		} else {
			return `${prev}0`;
		}
	}, '');
}

function getLeastBits(lines: Array<string>) {
	const counts = countBits(lines);

	return counts.reduce((prev, curr) => {
		if (curr.ones <= curr.zeroes) {
			return `${prev}1`;
		} else {
			return `${prev}0`;
		}
	}, '');
}

const input = readAsLines(`${__dirname}/input.txt`);
const gamma = getMostBits(input);
const epsilon = getLeastBits(input);
const gammaNumber = parseInt(gamma, 2);
const epislonNumber = parseInt(epsilon, 2);
console.log(epislonNumber * gammaNumber);
