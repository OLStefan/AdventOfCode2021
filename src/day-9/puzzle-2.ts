import { isEqual } from 'lodash';
import readAsLines from '../utils/readAsLines';
import { Coordinate, findLowPoints, mapToGrid, Matrix } from './shared';

function union<T>(a: Set<T>, b: Set<T>) {
	let union = new Set(a);
	b.forEach((entry) => union.add(entry));
	return union;
}

function getBasin(grid: Matrix<number>, point: Coordinate, checkedPoints: Set<Coordinate> = new Set()) {
	if (Array.from(checkedPoints).some((p) => isEqual(p, point))) {
		return checkedPoints;
	}

	let newCheckedPoints = new Set(checkedPoints);
	newCheckedPoints.add(point);

	const [row, column] = point;
	if (column !== 0 && grid[row]![column - 1]! !== 9) {
		newCheckedPoints = union(newCheckedPoints, getBasin(grid, [row, column - 1], newCheckedPoints));
	}
	if (column !== grid[row]!.length - 1 && grid[row]![column + 1]! !== 9) {
		newCheckedPoints = union(newCheckedPoints, getBasin(grid, [row, column + 1], newCheckedPoints));
	}
	if (row !== 0 && grid[row - 1]![column]! !== 9) {
		newCheckedPoints = union(newCheckedPoints, getBasin(grid, [row - 1, column], newCheckedPoints));
	}
	if (row !== grid.length - 1 && grid[row + 1]![column]! !== 9) {
		newCheckedPoints = union(newCheckedPoints, getBasin(grid, [row + 1, column], newCheckedPoints));
	}

	return newCheckedPoints;
}

function findBasins(grid: Matrix<number>, lowPoints: Array<Coordinate>) {
	return lowPoints.map((point) => getBasin(grid, point));
}

function result(basins: Array<Set<Coordinate>>) {
	return [...basins]
		.sort((a, b) => b.size - a.size)
		.reduce((product, current, index) => {
			if (index >= 3) {
				return product;
			}
			return product * current.size;
		}, 1);
}

const input = readAsLines(`${__dirname}/input.txt`);
const grid = mapToGrid(input);
const lowPoints = findLowPoints(grid);
const basins = findBasins(grid, lowPoints);
console.log(result(basins));
