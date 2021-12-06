import { groupBy, identity } from 'lodash';

export function updateLanternFish(fish: Array<number>) {
	const newFish = [...fish];
	const zeroDayFish = newFish.shift()!;
	newFish[6] += zeroDayFish;
	newFish[8] = zeroDayFish;

	return newFish;
}

export function simulateLanternFish(initialFish: Array<number>, days: number) {
	let fish = Array(9).fill(0);
	Object.entries(groupBy(initialFish, identity)).forEach(([key, value]) => {
		const parsedKey = parseInt(key);
		fish[parsedKey] = value.length;
	});

	for (let i = 0; i < days; i++) {
		fish = updateLanternFish(fish);
	}

	return fish.reduce((prev, curr) => prev + curr, 0);
}
