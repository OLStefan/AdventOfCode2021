import readAsLines from '../utils/readAsLines';
import { Coordinate, findLowPoints, mapToGrid, Matrix } from './shared';

function result(grid: Matrix<number>, lowPoints: Array<Coordinate>) {
	return lowPoints.reduce((sum, [row, column]) => sum + grid[row]![column]! + 1, 0);
}

const input = readAsLines(`${__dirname}/input.txt`);
const grid = mapToGrid(input);
const lowPoints = findLowPoints(grid);
console.log(result(grid, lowPoints));
