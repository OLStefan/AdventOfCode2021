export function countIncreases(numbers: Array<number>) {
	return numbers.reduce((previousValue, currentValue, currentIndex, array) => {
		if (currentIndex === 0) {
			return previousValue;
		}

		if (currentValue > array[currentIndex - 1]!) {
			return previousValue + 1;
		}

		return previousValue;
	}, 0);
}

export function getSegmentSums(numbers: Array<number>, segmentSize: number) {
	return numbers
		.map((_, index, array) => {
			if (index + segmentSize > array.length) {
				return [];
			}

			return array.slice(index, index + segmentSize);
		})
		.filter((list) => list.length)
		.map((list) => list.reduce((prev, curr) => prev + curr, 0));
}
