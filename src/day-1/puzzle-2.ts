import fs from 'fs';

const text = fs.readFileSync(`${__dirname}/input.txt`).toString();
const textByLine = text.split('\n');
const numbersByLine = textByLine.map((text) => parseInt(text));
const segments = numbersByLine
	.map((value, index, array) => {
		if (index >= array.length - 3) {
			return [];
		}

		return [value, array[index + 1]!, array[index + 2]!];
	})
	.filter((list) => list.length)
	.map((list) => list.reduce((prev, curr) => prev + curr, 0));

const increases = segments.reduce((previousValue, currentValue, currentIndex, array) => {
	if (currentIndex === 0) {
		return previousValue;
	}

	if (currentValue > array[currentIndex - 1]!) {
		return previousValue + 1;
	}

	return previousValue;
}, 0);

console.log(increases);
