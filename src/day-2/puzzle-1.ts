import fs from 'fs';

const text = fs.readFileSync(`${__dirname}/input.txt`).toString().trim();
const textByLine = text.split('\n');
const commandsByLine = textByLine.map((text) => text.split(' ') as [string, string]);

const increases = commandsByLine.reduce(
	(previousValue, currentValue) => {
		const [command, number] = currentValue;
		const numberParsed = parseInt(number);
		switch (command) {
			case 'up':
				return { ...previousValue, depth: previousValue.depth - numberParsed };
			case 'down':
				return { ...previousValue, depth: previousValue.depth + numberParsed };
			default:
				return { ...previousValue, horizontal: previousValue.horizontal + numberParsed };
		}
	},
	{ depth: 0, horizontal: 0 },
);

console.log(increases.depth * increases.horizontal);
