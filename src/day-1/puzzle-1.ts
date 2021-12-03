import fs from 'fs';

const text = fs.readFileSync(`${__dirname}/input.txt`).toString().trim();
const textByLine = text.split('\n');
const numbersByLine = textByLine.map((text) => parseInt(text));

const increases = numbersByLine.reduce((previousValue, currentValue, currentIndex, array) => {
	if (currentIndex === 0) {
		return previousValue;
	}

	if (currentValue > array[currentIndex - 1]!) {
		return previousValue + 1;
	}

	return previousValue;
}, 0);

console.log(increases);
