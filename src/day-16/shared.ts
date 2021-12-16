import { minBy, maxBy, chunk } from 'lodash';

function mapHexToBinary(hex: string) {
	return parseInt(hex, 16).toString(2).padStart(4, '0');
}

export function parseHexString(line: string) {
	return line.split('').map(mapHexToBinary).join('');
}

enum PacketType {
	OPERATOR,
	LITERAL,
}

interface BasePacket {
	version: number;
	value: number;
	rest: string;
}

interface OperatorPacket extends BasePacket {
	type: PacketType.OPERATOR;
}
interface LiteralPacket extends BasePacket {
	type: PacketType.LITERAL;
}
type Packet = OperatorPacket | LiteralPacket;

export function parseSubpackets(
	subpackets: string,
	calculateValue: (subpackets: Array<Packet>, id: number) => number,
	numberOfSubpackets?: number,
) {
	let count = 0;
	const parsedSubpackets = [];
	let remaining = subpackets;
	while (remaining && (!numberOfSubpackets || count < numberOfSubpackets)) {
		count++;
		const parsedPacket = parsePacket(remaining, calculateValue);
		parsedSubpackets.push(parsedPacket);
		remaining = parsedPacket.rest;
	}

	return { parsedSubpackets, rest: remaining };
}

export function valueByOperation(subpackets: Array<Packet>, id: number): number {
	switch (id) {
		case 0:
			return subpackets.reduce((prev, { value }) => prev + value, 0);
		case 1:
			return subpackets.reduce((prev, { value }) => prev * value, 1);
		case 2:
			return minBy(subpackets, 'value')!.value;
		case 3:
			return maxBy(subpackets, 'value')!.value;
		case 5: {
			const packetA = subpackets[0]!.value;
			const packetB = subpackets[1]!.value;
			return packetA > packetB ? 1 : 0;
		}
		case 6: {
			const packetA = subpackets[0]!.value;
			const packetB = subpackets[1]!.value;
			return packetA < packetB ? 1 : 0;
		}
		case 7: {
			const packetA = subpackets[0]!.value;
			const packetB = subpackets[1]!.value;
			return packetA === packetB ? 1 : 0;
		}
	}
	return 0;
}

export function sumVersions(subpackets: Array<Packet>): number {
	return subpackets.reduce((prev, curr) => {
		if (curr.type === PacketType.LITERAL) {
			return prev + curr.version;
		}
		return prev + curr.version + curr.value;
	}, 0);
}

export function parseOperatorPaket(
	line: string,
	calculateValue: (subpackets: Array<Packet>, id: number) => number,
): OperatorPacket {
	const version = parseInt(line.substr(0, 3), 2);
	const i = line.substr(6, 1);

	const length = i === '0' ? 15 : 11;
	const subpacketLengthBits = line.substr(7, length);
	const subpacketLength = parseInt(subpacketLengthBits, 2);

	let parsedSubpackets;
	let rest;

	if (i === '0') {
		const subpackets = line.substr(7 + length, subpacketLength);
		({ parsedSubpackets } = parseSubpackets(subpackets, calculateValue));
		rest = line.substr(7 + length + subpacketLength);
	} else {
		const subpackets = line.substr(7 + length);
		({ parsedSubpackets, rest } = parseSubpackets(subpackets, calculateValue, subpacketLength));
	}

	const id = parseInt(line.substr(3, 3), 2);

	return {
		version,
		value: calculateValue(parsedSubpackets, id),
		rest,
		type: PacketType.OPERATOR,
	};
}

export function parseLiteralPackage(line: string): LiteralPacket {
	const version = parseInt(line.substr(0, 3), 2);

	const groups = chunk(line.substr(6).split(''), 5);
	const { value, rest } = groups.reduce(
		(prev, group) => {
			if (prev.final) {
				return { ...prev, rest: `${prev.rest}${group.join('')}` };
			}
			const [mark, ...rest] = group;
			if (mark === '0') {
				return {
					...prev,
					final: true,
					value: `${prev.value}${rest.join('')}`,
				};
			}
			return {
				...prev,
				value: `${prev.value}${rest.join('')}`,
			};
		},
		{ final: false, value: '', rest: '' },
	);
	return { version, value: parseInt(value, 2), rest, type: PacketType.LITERAL };
}

export function parsePacket(line: string, calculateValue: (subpackets: Array<Packet>, id: number) => number): Packet {
	const type = line.substr(3, 3);

	if (parseInt(type, 2) === 4) {
		return parseLiteralPackage(line);
	} else {
		return parseOperatorPaket(line, calculateValue);
	}
}
