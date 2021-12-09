export type Matrix<T> = Array<Array<T>>;
export type Coordinate = [number, number];

export function mapToGrid(lines: Array<string>) {
	return lines.map((line) => line.split('').map((entry) => parseInt(entry)));
}

export function findLowPoints(grid: Matrix<number>) {
	const lowPoints: Array<Coordinate> = [];

	for (let row = 0; row < grid.length; row++) {
		for (let column = 0; column < grid[row]!.length; column++) {
			if (checkAdjacent(grid, grid[row]![column]!, row, column)) {
				lowPoints.push([row, column]);
			}
		}
	}

	return lowPoints;
}

function checkAdjacent(grid: Matrix<number>, entry: number, row: number, column: number) {
	let isLowPoint = true;
	if (column !== 0) {
		isLowPoint = isLowPoint && entry < grid[row]![column - 1]!;
	}
	if (column !== grid[row]!.length - 1) {
		isLowPoint = isLowPoint && entry < grid[row]![column + 1]!;
	}
	if (row !== 0) {
		isLowPoint = isLowPoint && entry < grid[row - 1]![column]!;
	}
	if (row !== grid.length - 1) {
		isLowPoint = isLowPoint && entry < grid[row + 1]![column]!;
	}

	return isLowPoint;
}
