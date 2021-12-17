import { isUndefined } from 'lodash';
import readFile from '../utils/readFile';
import { Interval, mapToInitialVelocities, parseInput, simulateShot } from './shared';

function findHittingTrajectories(targetArea: ReturnType<typeof parseInput>, maxX: number, yBounds: Interval) {
	return mapToInitialVelocities(maxX, yBounds).filter((t) => !isUndefined(simulateShot(t, targetArea)));
}

const input = readFile(`${__dirname}/input.txt`);
const target = parseInput(input);
const trajectories = findHittingTrajectories(target, target.x.upper, {
	...target.y,
	upper: 10 * Math.abs(target.y.upper),
});
console.log(trajectories.length);
