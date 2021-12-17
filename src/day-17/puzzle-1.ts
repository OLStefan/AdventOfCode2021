import readFile from '../utils/readFile';
import { Interval, mapToInitialVelocities, parseInput, simulateShot } from './shared';

function findHighestTrajectory(targetArea: ReturnType<typeof parseInput>, maxX: number, yBounds: Interval) {
	const trajectories = mapToInitialVelocities(maxX, yBounds);
	const highPoints = trajectories
		.map((t) => simulateShot(t, targetArea))
		.sort((a, b) => (!!a ? (!!b ? b - a : -1) : 1));

	return highPoints[0]!;
}

const input = readFile(`${__dirname}/input.txt`);
const target = parseInput(input);
const best = findHighestTrajectory(target, target.x.upper, { ...target.y, upper: 10 * Math.abs(target.y.upper) });
console.log(best);
