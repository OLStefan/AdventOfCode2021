import { isEqual } from 'lodash';
import { Coordinate } from '../types/types';

export function getPointsAndFolding(lines: Array<string>) {
	const split = lines.findIndex((line) => line === '');

	return {
		points: lines.slice(0, split).map((p) => {
			const [x, y] = p.split(',') as [string, string];
			return [parseInt(x), parseInt(y)] as Coordinate;
		}),
		folds: lines.slice(split + 1),
	};
}

export function fold(points: Array<Coordinate>, fold: string) {
	const [axis, coord] = fold.replace('fold along ', '').split('=') as [string, string];
	const line = parseInt(coord);

	const newPoints: Array<Coordinate> = [];

	points.forEach(([x, y]) => {
		let newPoint: Coordinate;
		if (axis === 'x') {
			newPoint = x > line ? [line - Math.abs(line - x), y] : [x, y];
		} else {
			newPoint = y > line ? [x, line - Math.abs(line - y)] : [x, y];
		}

		if (newPoints.some((p) => isEqual(p, newPoint))) {
			return;
		}

		newPoints.push(newPoint);
	});

	return newPoints;
}

export function getRemainingPoints(points: Array<Coordinate>, folds: Array<string>) {
	return folds.reduce(fold, points);
}
