import readAsLines from '../utils/readAsLines';
import { countFlashes, mapToGrid, Matrix, simulateStep } from './shared';

function simulateSteps(grid: Matrix<number>, steps: number) {
	let flashes = 0;
	let newGrid = grid;
	for (let i = 0; i < steps; i++) {
		newGrid = simulateStep(newGrid);
		flashes += countFlashes(newGrid);
	}

	return flashes;
}

const input = readAsLines(`${__dirname}/input.txt`);
const grid = mapToGrid(input);
console.log(simulateSteps(grid, 100));
