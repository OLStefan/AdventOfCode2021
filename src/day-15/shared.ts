import { isEqual } from 'lodash';
import { Coordinate, Matrix } from '../types/types';

export function isEntryInGrid(grid: Matrix<number>, row: number, column: number) {
	return row >= 0 && row < grid.length && column >= 0 && column < grid[row]!.length;
}

function estimate(grid: Matrix<number>, coord: Coordinate) {
	return grid.length - 1 - coord[0] + (grid[0]!.length - 1) - coord[1];
}

function getSuccessors(grid: Matrix<number>, node: Coordinate) {
	const successors: Array<Coordinate> = [];
	const [row, column] = node;
	if (isEntryInGrid(grid, row - 1, column)) {
		successors.push([row - 1, column]);
	}
	if (isEntryInGrid(grid, row + 1, column)) {
		successors.push([row + 1, column]);
	}
	if (isEntryInGrid(grid, row, column - 1)) {
		successors.push([row, column - 1]);
	}
	if (isEntryInGrid(grid, row, column + 1)) {
		successors.push([row, column + 1]);
	}

	return successors;
}

export function aStar(grid: Matrix<number>, start: Coordinate, target: Coordinate) {
	const openNodes: Array<Coordinate> = [start];

	const gScore: Record<string, number> = {};
	gScore[JSON.stringify(start)] = 0;

	const fScore: Record<string, number> = {};
	fScore[JSON.stringify(start)] = estimate(grid, start);

	while (openNodes.length) {
		openNodes.sort((a, b) => fScore[JSON.stringify(a)]! - fScore[JSON.stringify(b)]!);
		const currentNode = openNodes.shift()!;
		if (isEqual(currentNode, target)) {
			return gScore[JSON.stringify(currentNode)]!;
		}

		getSuccessors(grid, currentNode).forEach((node) => {
			const tentativeGScore = gScore[JSON.stringify(currentNode)]! + grid[node[0]]![node[1]]!;
			if (!gScore[JSON.stringify(node)] || tentativeGScore < gScore[JSON.stringify(node)]!) {
				gScore[JSON.stringify(node)] = tentativeGScore;
				fScore[JSON.stringify(node)] = tentativeGScore + estimate(grid, node);
				if (!openNodes.some((n) => isEqual(n, node))) {
					openNodes.push(node);
				}
			}
		});
	}

	return undefined;
}
