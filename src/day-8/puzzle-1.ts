import readAsLines from '../utils/readAsLines';

function getOutputs(lines: Array<string>) {
	return lines.flatMap((line) => {
		const [, out] = line.split(' | ');
		return out!.split(' ');
	});
}

function count1478(numbers: Array<string>) {
	return numbers.reduce((prev, curr) => {
		console.log(curr.length);
		const l = curr.length;
		if (l === 2 || l === 4 || l === 3 || l === 7) {
			return prev + 1;
		}
		return prev;
	}, 0);
}

const input = readAsLines(`${__dirname}/input.txt`);
console.log(count1478(getOutputs(input)));
