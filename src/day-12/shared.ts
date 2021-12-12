export const START_NODE = 'start';
export const END_NODE = 'end';

export function sortStrings(a: string, b: string) {
	return a.localeCompare(b);
}

export function buildGraph(lines: Array<string>) {
	return lines.reduce((graph, current) => {
		const [a, b] = current.split('-') as [string, string];
		return {
			...graph,
			[a]: [...(graph[a] ?? []), b].sort(sortStrings),
			[b]: [...(graph[b] ?? []), a].sort(sortStrings),
		};
	}, {} as Record<string, Array<string>>);
}

export function findWays(
	graph: Record<string, Array<string>>,
	createFilter: (visitedNodes: Array<string>) => (node: string) => boolean,
	currentNode: string = START_NODE,
	visitedNodes: Array<string> = [],
): Array<Array<string>> {
	const newVisitedNode = [...visitedNodes, currentNode];
	if (currentNode === END_NODE) {
		return [newVisitedNode];
	}
	const nextNodes = graph[currentNode]!.filter(createFilter(newVisitedNode));

	if (!nextNodes.length) {
		return [];
	}

	return nextNodes.flatMap((node) => findWays(graph, createFilter, node, newVisitedNode));
}
