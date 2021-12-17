import { Coordinate } from '../types/types';

export interface Interval {
	lower: number;
	upper: number;
}

const regexX = /.*x=(\d+\.\.\d+).*/;
const regexY = /.*y=(-\d+\.\.-\d+).*/;
export function parseInput(input: string): { x: Interval; y: Interval } {
	const [, matchX] = input.match(regexX)!;
	const [, matchY] = input.match(regexY)!;

	const [minX, maxX] = matchX?.split('..').map((n) => parseInt(n)) as [number, number];
	const [minY, maxY] = matchY?.split('..').map((n) => parseInt(n)) as [number, number];

	return { x: { lower: minX, upper: maxX }, y: { lower: minY, upper: maxY } };
}

function isInTargetArea([x, y]: Coordinate, targetArea: ReturnType<typeof parseInput>) {
	return x >= targetArea.x.lower && x <= targetArea.x.upper && y >= targetArea.y.lower && y <= targetArea.y.upper;
}

function missedTargetArea([x, y]: Coordinate, targetArea: ReturnType<typeof parseInput>) {
	return x > targetArea.x.upper || y < targetArea.y.lower;
}

export function simulateShot(initialVelocity: Coordinate, targetArea: ReturnType<typeof parseInput>) {
	let currentPosition: Coordinate = [0, 0];
	let currentVelocity: Coordinate = initialVelocity;
	let highestPoint = 0;

	while (!isInTargetArea(currentPosition, targetArea) && !missedTargetArea(currentPosition, targetArea)) {
		currentPosition = [currentPosition[0] + currentVelocity[0], currentPosition[1] + currentVelocity[1]];
		if (currentPosition[1] > highestPoint) {
			highestPoint = currentPosition[1];
		}
		currentVelocity = [Math.max(currentVelocity[0] - 1, 0), currentVelocity[1] - 1];
	}

	if (missedTargetArea(currentPosition, targetArea)) {
		return undefined;
	}

	return highestPoint;
}

export function mapToInitialVelocities(maxX: number, yBounds: Interval) {
	return Array(maxX + 1)
		.fill(undefined)
		.flatMap((_, xIndex) =>
			Array(Math.abs(yBounds.upper - yBounds.lower))
				.fill(undefined)
				.map((_, yIndex) => [xIndex, yBounds.lower + yIndex] as Coordinate),
		);
}
