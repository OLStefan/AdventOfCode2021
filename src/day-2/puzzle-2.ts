import readAsLines from '../utils/readAsLines';
import { getCommands } from './shared';

function getPosition(commands: Array<{ command: string; value: number }>): { depth: number; horizontal: number } {
	return commands.reduce(
		(previousValue, currentValue) => {
			const { command, value } = currentValue;
			switch (command) {
				case 'up':
					return { ...previousValue, aim: previousValue.aim - value };
				case 'down':
					return { ...previousValue, aim: previousValue.aim + value };
				default:
					return {
						...previousValue,
						horizontal: previousValue.horizontal + value,
						depth: previousValue.depth + previousValue.aim * value,
					};
			}
		},
		{ depth: 0, horizontal: 0, aim: 0 },
	);
}

const input = readAsLines(`${__dirname}/input.txt`);
const commands = getCommands(input);
const position = getPosition(commands);
console.log(position.depth * position.horizontal);
