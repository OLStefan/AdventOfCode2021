import readAsLines from '../utils/readAsLines';
import { aStar } from './shared';

function mapToGrid(lines: Array<string>) {
	return lines.map((line) => line.split('').map((entry) => parseInt(entry)));
}

const input = readAsLines(`${__dirname}/input.txt`);
const grid = mapToGrid(input);
const cost = aStar(grid, [0, 0], [grid.length - 1, grid[0]!.length - 1]);
console.log(cost);
