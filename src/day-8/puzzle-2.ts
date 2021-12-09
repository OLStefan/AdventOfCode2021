import { isEqual } from 'lodash';
import readAsLines from '../utils/readAsLines';
import readFile from '../utils/readFile';

interface Entry {
	patterns: string[];
	output: string[];
}

function parse(lines: Array<string>) {
	return lines.map((line) => {
		const [patterns, output] = line.split(' | ');
		return {
			patterns: patterns!.split(' '),
			output: output!.split(' '),
		};
	});
}

function union<T>(a: Set<T>, b: Set<T>) {
	let union = new Set(a);
	b.forEach((entry) => union.add(entry));
	return union;
}
function intersection<T>(a: Set<T>, b: Set<T>) {
	return new Set(Array.from(a).filter((e) => b.has(e)));
}
function difference<T>(a: Set<T>, b: Set<T>) {
	return new Set(Array.from(a).filter((e) => !b.has(e)));
}
function equal<T>(a: Set<T>, b: Set<T>) {
	return isEqual(Array.from(a).sort(), Array.from(b).sort());
}

function deduceSegments(entry: Entry) {
	const segments = [];

	const candidates5 = [];
	const candidates6 = [];

	for (const p of entry.patterns) {
		const len = p.length;
		const s = new Set(p.split(''));
		if (len === 2) segments[1] = s;
		if (len === 3) segments[7] = s;
		if (len === 4) segments[4] = s;
		if (len === 7) segments[8] = s;
		if (len === 5) candidates5.push(s);
		if (len === 6) candidates6.push(s);
	}

	const horizontalSegments = intersection(intersection(candidates5[0]!, candidates5[1]!), candidates5[2]!);
	// Digit 3 has all of these, and additionally has the the same two right
	// vertical segments as digit 1.
	segments[3] = union(horizontalSegments, segments[1]!);

	// Removing the segments of digit 3 from digit 4, we get the top left
	// vertical segment.
	const verticalSegments = Array.from(difference(segments[4]!, segments[3]!))[0]!;

	// Of the remaining patterns of length 5, the one that has the vertical top
	// left segment on is the digit 5. The other one is digit 2.
	for (const segment of candidates5) {
		if (equal(segment, segments[3])) continue;
		segments[segment.has(verticalSegments) ? 5 : 2] = segment;
	}

	// Digits 9 has one extra segment in addition to digit 3.
	for (const segment of candidates6) {
		if (difference(segment, segments[3]).size === 1) {
			segments[9] = segment;
		} else {
			// Digit 9 has all three of the horizontal segments
			segments[equal(intersection(segment, horizontalSegments), horizontalSegments) ? 6 : 0] = segment;
		}
	}

	return segments;
}

function value(entry: Entry) {
	const segments = deduceSegments(entry);
	const digits = entry.output.map((d) => new Set(d.split('')));
	return digits.reduce((sum, digit) => {
		return sum * 10 + segments.findIndex((s) => equal(digit, s));
	}, 0);
}

const sum = (xs: Array<number>) => xs.reduce((a, x) => a + x, 0);
const p2 = (entries: Array<Entry>) => sum(entries.map((e) => value(e)));

const input = readAsLines(`${__dirname}/input.txt`);
const entries = parse(input);
console.log(p2(entries));
