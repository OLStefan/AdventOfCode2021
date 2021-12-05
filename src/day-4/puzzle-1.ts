import fs from 'fs';
import readAsLines from '../utils/readAsLines';
import { computeResult, getDrawsAndBoards, getResult, getWinningBoard } from './functions';

const textByLine = readAsLines(`${__dirname}/input.txt`);
const drawsAndBoards = getDrawsAndBoards(textByLine);
const result = getResult(drawsAndBoards, getWinningBoard);
console.log(computeResult(result));
