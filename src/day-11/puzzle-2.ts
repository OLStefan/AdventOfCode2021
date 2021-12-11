import readAsLines from '../utils/readAsLines';
import { countFlashes, mapToGrid, Matrix, simulateStep } from './shared';

function getSynchronizedStep(grid: Matrix<number>) {
	let count = 0;
	let newGrid = grid;
	while (countFlashes(newGrid) !== 100) {
		count++;
		newGrid = simulateStep(newGrid);
	}

	return count;
}

const input = readAsLines(`${__dirname}/input.txt`);
const grid = mapToGrid(input);
console.log(getSynchronizedStep(grid));
