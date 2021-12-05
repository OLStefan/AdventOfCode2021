import { chunk } from 'lodash';

export type BingoBoard = [
	[string, string, string, string, string],
	[string, string, string, string, string],
	[string, string, string, string, string],
	[string, string, string, string, string],
	[string, string, string, string, string],
];
export type BingoCheck = [
	[boolean, boolean, boolean, boolean, boolean],
	[boolean, boolean, boolean, boolean, boolean],
	[boolean, boolean, boolean, boolean, boolean],
	[boolean, boolean, boolean, boolean, boolean],
	[boolean, boolean, boolean, boolean, boolean],
];

export function getDrawsAndBoards(lines: Array<string>) {
	const [drawArray, ...boardArray] = lines;
	const boards = chunk(boardArray, 6).map(
		(board) =>
			board
				.filter((_, index) => !!index)
				.map((line) => {
					return line
						.replace(/ +(?= )/g, '')
						.trim()
						.split(' ');
				}) as BingoBoard,
	);

	return { draws: drawArray!.split(','), boards };
}

export function getLastBoard(bingo: Array<{ board: BingoBoard; check: BingoCheck }>) {
	const lastBoards = bingo.filter((board) => !checkBingo(board.check));

	if (lastBoards.length === 1) {
		return lastBoards[0]?.board;
	}

	return undefined;
}

export function getWinningBoard(
	bingo: Array<{ board: BingoBoard; check: BingoCheck }>,
	draw: string,
	drawsDone: Array<string>,
) {
	const winningBoard = bingo.find((board) => checkBingo(board.check));

	if (winningBoard) {
		return { bingo: winningBoard.board, winningDraw: draw, drawsDone };
	}

	return undefined;
}

export function getResult<T>(
	{ draws, boards }: ReturnType<typeof getDrawsAndBoards>,
	getResult: (
		bingo: Array<{ board: BingoBoard; check: BingoCheck }>,
		draw: string,
		drawsDone: Array<string>,
	) => T | undefined,
): T {
	const drawsDone = [];

	let bingo = boards.map((board) => ({
		board,
		check: Array(5)
			.fill(undefined)
			.map(() => Array(5).fill(false)) as BingoCheck,
	}));

	for (const draw of draws) {
		drawsDone.push(draw);
		bingo = bingo.map(({ board, check }) => ({
			board,
			check: board.map((line, i) => line.map((entry, j) => !!check[i]![j] || entry === draw)) as BingoCheck,
		}));

		const result = getResult(bingo, draw, drawsDone);
		if (result) {
			return result;
		}
	}

	throw new Error('No result');
}

export function checkBingo(board: BingoCheck) {
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

export function computeResult({ bingo, winningDraw, drawsDone }: NonNullable<ReturnType<typeof getWinningBoard>>) {
	const nonDrawnSum = bingo.flat().reduce((prev, curr) => (prev += drawsDone.includes(curr) ? 0 : parseInt(curr)), 0);
	return nonDrawnSum * parseInt(winningDraw);
}
