import readAsLines from '../utils/readAsLines';
import { buildGraph, findWays, START_NODE } from './shared';

function createNodeFilter(visitedNodes: Array<string>): (node: string) => boolean {
	function filterNodes(node: string) {
		const nodeAlreadyVisited = visitedNodes.includes(node);
		if (!nodeAlreadyVisited) {
			return true;
		}
		if (node === node.toUpperCase()) {
			return true;
		}

		const smallCaveAlreadyVisitedTwice = visitedNodes
			.filter((innerNode) => innerNode === innerNode.toLowerCase())
			.some((innerNode) => visitedNodes.indexOf(innerNode) !== visitedNodes.lastIndexOf(innerNode));

		if (smallCaveAlreadyVisitedTwice) {
			return false;
		}
		if (node === START_NODE) {
			return false;
		}

		return true;
	}
	return filterNodes;
}

const input = readAsLines(`${__dirname}/input.txt`);
const graph = buildGraph(input);
const ways = findWays(graph, createNodeFilter);
console.log(ways.length);
