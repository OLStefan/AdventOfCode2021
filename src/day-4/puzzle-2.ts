import readAsLines from '../utils/readAsLines';
import { computeResult, getDrawsAndBoards, getLastBoard, getResult, getWinningBoard } from './functions';

const textByLine = readAsLines(`${__dirname}/input.txt`);
const drawsAndBoards = getDrawsAndBoards(textByLine);
const lastBoard = getResult(drawsAndBoards, getLastBoard);
const completed = getResult({ ...drawsAndBoards, boards: [lastBoard] }, getWinningBoard);
console.log(computeResult(completed));
