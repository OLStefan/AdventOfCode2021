import { isEqual } from 'lodash';
import { isImportEqualsDeclaration } from 'typescript';
import { Coordinate, Matrix } from '../types/types';
import readAsLines from '../utils/readAsLines';
import { aStar, isEntryInGrid } from './shared';

function getNewRisk(original: number, added: number) {
	const newValue = (original + added) % 10;

	if (newValue < original) {
		return newValue + 1;
	}

	return newValue;
}

function mapToExtendedGrid(lines: Array<string>) {
	return [0, 1, 2, 3, 4].reduce((prev, curr) => {
		return [
			...prev,
			...lines.map((line) => [
				...line.split('').map((entry) => getNewRisk(parseInt(entry), curr)),
				...line.split('').map((entry) => getNewRisk(parseInt(entry), curr + 1)),
				...line.split('').map((entry) => getNewRisk(parseInt(entry), curr + 2)),
				...line.split('').map((entry) => getNewRisk(parseInt(entry), curr + 3)),
				...line.split('').map((entry) => getNewRisk(parseInt(entry), curr + 4)),
			]),
		];
	}, [] as Matrix<number>);
}

const input = readAsLines(`${__dirname}/input.txt`);
const grid = mapToExtendedGrid(input);
const cost = aStar(grid, [0, 0], [grid.length - 1, grid[0]!.length - 1]);
console.log(cost);
