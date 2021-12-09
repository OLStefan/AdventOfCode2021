import fs from 'fs';
import readAsLines from '../utils/readAsLines';
import { computeResult, getDrawsAndBoards, getResult, getWinningBoard } from './shared';

const input = readAsLines(`${__dirname}/input.txt`);
const drawsAndBoards = getDrawsAndBoards(input);
const result = getResult(drawsAndBoards, getWinningBoard);
console.log(computeResult(result));
