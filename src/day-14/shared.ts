export function getPairsAndRules(lines: Array<string>) {
	const pairs = lines[0]!.split('').reduce((prev, curr, index, template) => {
		if (index === template.length - 1) {
			return prev;
		}
		const key = `${curr}${template[index + 1]!}`;
		return { ...prev, [key]: (prev[key] ?? 0) + 1 };
	}, {} as Record<string, number>);

	return {
		pairs,
		rules: lines.slice(2).reduce((prev, curr) => {
			const [key, product] = curr.split(' -> ') as [string, string];
			return { ...prev, [key]: product };
		}, {} as Record<string, string>),
	};
}

function simulateStep({ pairs, rules }: ReturnType<typeof getPairsAndRules>) {
	return Object.keys(pairs).reduce((prev, curr) => {
		const [a, b] = curr.split('') as [string, string];
		const newIngredient = rules[curr]!;
		const pair1 = `${a}${newIngredient}`;
		const pair2 = `${newIngredient}${b}`;
		return {
			...prev,
			[pair1]: (prev[pair1] ?? 0) + pairs[curr]!,
			[pair2]: (prev[pair2] ?? 0) + pairs[curr]!,
		};
	}, {} as Record<string, number>);
}

export function simulateSteps({ pairs, rules }: ReturnType<typeof getPairsAndRules>, steps: number) {
	let newPairs = pairs;
	for (let i = 0; i < steps; i++) {
		newPairs = simulateStep({ pairs: newPairs, rules });
	}

	return newPairs;
}

export function result(pairs: ReturnType<typeof getPairsAndRules>['pairs'], lastComponent: string) {
	const occurences = Object.keys(pairs).reduce((prev, curr) => {
		const [key] = curr.split('') as [string];
		return { ...prev, [key]: (prev[key] ?? 0) + pairs[curr]! };
	}, {} as Record<string, number>);

	occurences[lastComponent] = (occurences[lastComponent] ?? 0) + 1;

	const sorted = Object.values(occurences).sort((a, b) => b - a);

	return sorted[0]! - sorted[sorted.length - 1]!;
}
