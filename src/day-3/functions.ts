export type Count = { ones: number; zeroes: number };

export function countBits(lines: Array<string>) {
	const length = lines[0]!.length;

	return lines.reduce((prev, curr) => {
		return curr.split('').map((bit, index) => ({
			ones: prev[index]!.ones + (bit === '1' ? 1 : 0),
			zeroes: prev[index]!.zeroes + (bit === '0' ? 1 : 0),
		}));
	}, Array(length).fill({ ones: 0, zeroes: 0 }) as Array<Count>);
}

export function filterLinesByBit(lines: string[], moreOnes: string, lessOnes: string) {
	const places = lines[0]!.length;
	let filteredLines = lines;
	for (let i = 0; i < places; i++) {
		if (filteredLines.length === 1) {
			break;
		}

		const counts = countBits(filteredLines);
		const { ones, zeroes } = counts[i]!;
		const moreOrEqualOnes = ones >= zeroes;

		if (moreOrEqualOnes) {
			filteredLines = filteredLines.filter((line) => line[i] === moreOnes);
		} else {
			filteredLines = filteredLines.filter((line) => line[i] === lessOnes);
		}
	}

	return filteredLines;
}
