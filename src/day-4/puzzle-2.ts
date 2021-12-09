import readAsLines from '../utils/readAsLines';
import { computeResult, getDrawsAndBoards, getLastBoard, getResult, getWinningBoard } from './shared';

const input = readAsLines(`${__dirname}/input.txt`);
const drawsAndBoards = getDrawsAndBoards(input);
const lastBoard = getResult(drawsAndBoards, getLastBoard);
const completed = getResult({ ...drawsAndBoards, boards: [lastBoard] }, getWinningBoard);
console.log(computeResult(completed));
