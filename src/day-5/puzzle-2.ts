import fs from 'fs';
import { cloneDeep } from 'lodash';

const text = fs.readFileSync(`${__dirname}/input.txt`).toString().trim();
const textByLine = text.split('\n');

function readVents(lines: string[]): Array<[[number, number], [number, number]]> {
	return lines.map((line) => {
		const points = line.split(' -> ') as [`${number},${number}`, `${number},${number}`];
		const parsedPoints = points.map((point) => point.split(',').map((coord) => parseInt(coord)));
		return parsedPoints as [[number, number], [number, number]];
	});
}

function mapVents(vents: ReturnType<typeof readVents>) {
	const maxSize = vents.reduce(
		(prev, curr) => {
			return {
				x: Math.max(prev.x, curr[0][0] + 1, curr[1][0] + 1),
				y: Math.max(prev.y, curr[0][1] + 1, curr[1][1] + 1),
			};
		},
		{ x: 10, y: 10 },
	);

	const ventMap: number[][] = Array(maxSize.y)
		.fill(undefined)
		.map(() => Array(maxSize.x).fill(0));

	return vents.reduce((prev, curr) => {
		const next = cloneDeep(prev);
		if (curr[0][0] === curr[1][0]) {
			const x = curr[0][0];
			for (let i = Math.min(curr[0][1], curr[1][1]); i <= Math.max(curr[0][1], curr[1][1]); i++) {
				next[i]![x]++;
			}
		} else if (curr[0][1] === curr[1][1]) {
			const y = curr[0][1];
			for (let i = Math.min(curr[0][0], curr[1][0]); i <= Math.max(curr[0][0], curr[1][0]); i++) {
				next[y]![i]++;
			}
		} else {
			const diff = Math.abs(curr[0][0] - curr[1][0]);
			const signX = Math.sign(curr[0][0] - curr[1][0]);
			const signY = Math.sign(curr[0][1] - curr[1][1]);
			for (let i = 0; i <= diff; i++) {
				next[Math.abs(curr[0][1] - i * signY)]![Math.abs(curr[0][0] - i * signX)]++;
			}
		}
		return next;
	}, ventMap);
}

function countTwos(ventMap: number[][]) {
	return ventMap.reduce((lineSum, line) => {
		return lineSum + line.filter((entry) => entry >= 2).length;
	}, 0);
}

const points = readVents(textByLine);
const ventMap = mapVents(points);
console.log(countTwos(ventMap));
