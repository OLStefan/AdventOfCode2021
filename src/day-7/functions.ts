import { groupBy, identity, max } from 'lodash';

export function groupCrabs(crabs: Array<number>) {
	const positions = Object.entries(groupBy(crabs, identity));
	const maxPosition = max(positions.map(([key]) => parseInt(key)))!;
	let groupedCrabs: Array<number> = Array(maxPosition + 1).fill(0);
	positions.forEach(([key, value]) => {
		const parsedKey = parseInt(key);
		groupedCrabs[parsedKey] = value.length;
	});
	return [groupedCrabs, maxPosition] as const;
}

export function getBestTargetPosition(
	crabs: Array<number>,
	maxPosition: number,
	getComsumption: (position: number, target: number) => number,
) {
	let bestValue = Number.MAX_VALUE;
	for (let i = 0; i <= maxPosition; i++) {
		const value = crabs.reduce((prev, curr, index) => {
			return prev + curr * getComsumption(index, i);
		}, 0);
		if (value < bestValue) {
			bestValue = value;
		}
	}

	return bestValue;
}

export function getFuelUsageBasicDiff(position: number, target: number) {
	return Math.abs(position - target);
}

export function getFuelUsageGausianSum(position: number, target: number) {
	const diff = Math.abs(position - target);
	return (diff ** 2 + diff) / 2;
}
