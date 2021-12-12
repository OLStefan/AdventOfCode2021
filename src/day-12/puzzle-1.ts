import readAsLines from '../utils/readAsLines';
import { buildGraph, findWays } from './shared';

function createNodeFilter(visitedNodes: Array<string>): (node: string) => boolean {
	return (node) => node === node.toUpperCase() || !visitedNodes.includes(node);
}

const input = readAsLines(`${__dirname}/input.txt`);
const graph = buildGraph(input);
const ways = findWays(graph, createNodeFilter);
console.log(ways.length);
