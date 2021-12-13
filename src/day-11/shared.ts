import { cloneDeep } from 'lodash';
import { Matrix } from '../types/types';

export function mapToGrid(lines: Array<string>) {
	return lines.map((line) => line.split('').map((entry) => parseInt(entry)));
}

function isEntryInGrid(grid: Matrix<number>, row: number, column: number) {
	return row >= 0 && row < grid.length && column >= 0 && column < grid[row]!.length;
}

export function increaseAdjacent(grid: Matrix<number>, row: number, column: number): Matrix<number> {
	if (grid[row]![column] !== 0) {
		return grid;
	}

	let newGrid = cloneDeep(grid);

	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			if ((i || j) && isEntryInGrid(grid, row + i, column + j) && newGrid[row + i]![column + j]) {
				newGrid[row + i]![column + j]! = (newGrid[row + i]![column + j]! + 1) % 10;
				if (newGrid[row + i]![column + j]! === 0) {
					newGrid = increaseAdjacent(newGrid, row + i, column + j);
				}
			}
		}
	}

	return newGrid;
}

export function simulateStep(grid: Matrix<number>): Matrix<number> {
	const stepGrid = grid.map((line) => line.map((entry) => (entry + 1) % 10));

	let newGrid = cloneDeep(stepGrid);

	// Increases by flashes, cannot increase 0 -> 1
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (stepGrid[i]![j] === 0) {
				newGrid = increaseAdjacent(newGrid, i, j);
			}
		}
	}

	newGrid.forEach((line) => console.log(line.join('')));
	console.log('-----');

	return newGrid;
}

export function countFlashes(grid: Matrix<number>): number {
	return grid.reduce((gridSum, line) => {
		return gridSum + line.reduce((lineSum, entry) => lineSum + (entry === 0 ? 1 : 0), 0);
	}, 0);
}
