const expect = require('expect');

const { findEmpty, isFinished, findBestMove, calculateScore, minMax } = require('./game.js');

const testfindEmpty = () => {
  let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  expect(findEmpty(board)).toEqual([0,1,2,3,4,5,6,7,8]);
  board = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' '];
  expect(findEmpty(board)).toEqual([8]);
  board = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'O'];
  expect(findEmpty(board)).toEqual([]);
}

const testIsFinished = () => {
  let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  expect(isFinished(board)).toEqual(false);
  board = [' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', ' '];
  expect(isFinished(board)).toEqual('X');
  board = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'];
  expect(isFinished(board)).toEqual('draw');
  board = [' ', 'O', ' ', ' ', 'O', ' ', ' ', 'O', ' '];
  expect(isFinished(board)).toEqual('O');
  board = [' ', ' ', 'X', ' ', 'X', ' ', 'X', ' ', ' '];
  expect(isFinished(board)).toEqual('X');
}

const testCalculateScore = () => {
  let board = ['X', 'X', 'X', ' ', 'O', 'O', ' ', ' ', ' '];
  let player = 'X';
  expect(calculateScore(board, player)).toEqual(-17); //X won
  board = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'];
  player = 'O';
  expect(calculateScore(board, player)).toEqual(0); //draw
  board = ['O', 'X', 'O', 'O', 'X', 'X', 'O', 'X', ' '];
  player = 'X';
  expect(calculateScore(board, player)).toEqual(16); //O won
}

const testMinMax = () => {
  let board = ['X', 'X', 'X', ' ', 'O', 'O', ' ', ' ', ' '];
  let player = 'X';
  expect(minMax(board, player, player)).toEqual(-17); //X won
  board = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'];
  player = 'O';
  expect(minMax(board, player, player)).toEqual(0); //draw
  board = ['O', 'X', 'O', 'O', 'X', 'X', 'O', 'X', ' '];
  player = 'X';
  expect(minMax(board, player, player)).toEqual(16); //O won
  board = ['O', 'X', 'O', ' ', 'X', 'X', 'O', 'X', ' '];
  player = 'O';
  expect(minMax(board, player, player)).toEqual(16);
  board = ['O', 'X', 'O', ' ', 'X', ' ', 'X', 'O', ' '];
  player = 'O';
  expect(minMax(board, player, player)).toEqual(0);
}

const testfindBestMove = () => {
  let board = ['O', 'X', 'O', ' ', 'X', ' ', 'X', 'O', ' '];
  let player = 'X';
  expect(findBestMove(board, player)).toEqual(3);
  board = ['X', ' ', 'O', ' ', 'O', ' ', 'X', ' ', ' '];
  player = 'X';
  expect(findBestMove(board, player)).toEqual(3);
  board = ['X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  player = 'O';
  expect(findBestMove(board, player)).toEqual(4);
  board = ['X', 'O', ' ', 'O', 'O', 'X', 'X', ' ', ' '];
  player = 'X';
  expect(findBestMove(board, player)).toEqual(7);
}

testfindEmpty();
testIsFinished();
testCalculateScore();
testMinMax();
testfindBestMove();

console.log('tests pass');