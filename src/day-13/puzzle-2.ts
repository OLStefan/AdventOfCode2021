import { Coordinate, Matrix } from '../types/types';
import readAsLines from '../utils/readAsLines';
import { getPointsAndFolding, getRemainingPoints } from './shared';

function printRemaining(remaning: Array<Coordinate>) {
	const { x, y } = remaning.reduce((max, [x, y]) => ({ x: Math.max(max.x, x), y: Math.max(max.y, y) }), { x: 0, y: 0 });

	const grid = Array(y + 1)
		.fill(undefined)
		.map(() => Array(x + 1).fill(' ')) as Matrix<string>;

	remaning.forEach(([x, y]) => {
		grid[y]![x] = '▩';
	});

	grid.forEach((line) => console.log(line.join('')));
}

const input = readAsLines(`${__dirname}/input.txt`);
const { points, folds } = getPointsAndFolding(input);
const remaning = getRemainingPoints(points, folds);
printRemaining(remaning);
