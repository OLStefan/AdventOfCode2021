import fs from 'fs';
import { omit } from 'lodash';
import { isReturnStatement } from 'typescript';

const text = fs.readFileSync(`${__dirname}/input.txt`).toString().trim();
const textByLine = text.split('\n');

const drawnNumbers = textByLine.shift()!.split(',');

type BingoBoard = [
	[string, string, string, string, string],
	[string, string, string, string, string],
	[string, string, string, string, string],
	[string, string, string, string, string],
	[string, string, string, string, string],
];
let bingoBoards: Array<BingoBoard> = [];

while (textByLine.length >= 6) {
	textByLine.shift();

	const board = [
		textByLine
			.shift()!
			.replace(/ +(?= )/g, '')
			.trim()
			.split(' '),
		textByLine
			.shift()!
			.replace(/ +(?= )/g, '')
			.trim()
			.split(' '),
		textByLine
			.shift()!
			.replace(/ +(?= )/g, '')
			.trim()
			.split(' '),
		textByLine
			.shift()!
			.replace(/ +(?= )/g, '')
			.trim()
			.split(' '),
		textByLine
			.shift()!
			.replace(/ +(?= )/g, '')
			.trim()
			.split(' '),
	];

	bingoBoards.push(board as BingoBoard);
}

type BingoCheck = [
	[boolean, boolean, boolean, boolean, boolean],
	[boolean, boolean, boolean, boolean, boolean],
	[boolean, boolean, boolean, boolean, boolean],
	[boolean, boolean, boolean, boolean, boolean],
	[boolean, boolean, boolean, boolean, boolean],
];
let bingoCheck = bingoBoards.map((board) => board.map((line) => line.map(() => false))) as Array<BingoCheck>;

function filterWinningBoards() {
	const draws = [];
	for (const draw of drawnNumbers) {
		draws.push(draw);
		console.log(draw, bingoCheck);
		bingoCheck = bingoBoards.map((board, i) =>
			board.map((line, j) => line.map((entry, k) => bingoCheck[i]![j]![k] || entry === draw)),
		) as Array<BingoCheck>;

		const winningBoards = bingoCheck.filter(checkBingo);
		bingoCheck = bingoCheck.filter((board, index) => {
			const isWinning = winningBoards.includes(board);
			if (isWinning) {
				bingoBoards = bingoBoards.filter((_, i) => i !== index);
			}
			return !isWinning;
		});

		if (bingoBoards.length === 1) {
			return;
		}
	}
}

function drawNumbers() {
	const draws = [];
	for (const draw of drawnNumbers) {
		console.log(bingoBoards.length, bingoCheck.length, draw);
		draws.push(draw);
		bingoCheck = bingoBoards.map((board, i) =>
			board.map((line, j) => line.map((entry, k) => bingoCheck[i]![j]![k] || entry === draw)),
		) as Array<BingoCheck>;

		if (bingoBoards.length === 1) {
			const completedIndex = bingoCheck.findIndex(checkBingo);

			if (completedIndex !== -1) {
				return { bingo: bingoBoards[completedIndex]!, winningDraw: draw, draws };
			}
		} else {
			const winningBoards = bingoCheck.filter(checkBingo);
			const filteredIndezes: number[] = [];
			bingoCheck = bingoCheck.filter((board, index) => {
				const isWinning = winningBoards.includes(board);
				if (isWinning) {
					filteredIndezes.push(index);
				}
				return !isWinning;
			});
			bingoBoards = bingoBoards.filter((_, i) => !filteredIndezes.includes(i));
		}
	}
}

function checkBingo(board: BingoCheck) {
	for (let i = 0; i < 5; i++) {
		let row = true;
		let column = true;

		for (let j = 0; j < 5; j++) {
			row = row && board[i]![j]!;
			column = column && board[j]![i]!;
		}

		if (row || column) {
			return true;
		}
	}

	return false;
}

function result({ bingo, winningDraw, draws }: NonNullable<ReturnType<typeof drawNumbers>>) {
	const nonDrawnSum = bingo
		.flatMap((line) => line)
		.reduce((prev, curr) => (prev += draws.includes(curr) ? 0 : parseInt(curr)), 0);
	return nonDrawnSum * parseInt(winningDraw);
}

// filterWinningBoards();
console.log(bingoBoards.length);
const completed = drawNumbers()!;
console.log(result(completed));
