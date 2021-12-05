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
