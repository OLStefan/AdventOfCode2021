import fs from 'fs';

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
const bingoBoards: Array<BingoBoard> = [];

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

function drawNumbers() {
	const draws = [];
	for (const draw of drawnNumbers) {
		draws.push(draw);
		bingoCheck = bingoBoards.map((board, i) =>
			board.map((line, j) => line.map((entry, k) => bingoCheck[i]![j]![k] || entry === draw)),
		) as Array<BingoCheck>;

		const completedIndex = bingoCheck.findIndex(checkBingo);

		if (completedIndex !== -1) {
			return { bingo: bingoBoards[completedIndex]!, winningDraw: draw, draws };
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

const completed = drawNumbers()!;
console.log(result(completed));
