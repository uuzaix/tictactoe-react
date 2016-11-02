const expect = require('expect');

const { findEmpty, isFinished, findPreWin, makeMove, calculateScore } = require('./game.js');

const testfindEmpty = () => {
  let board = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];
  expect(findEmpty(board)).toEqual([0,1,2,3,4,5,6,7,8]);
  board = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '_'];
  expect(findEmpty(board)).toEqual([8]);
  board = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'O'];
  expect(findEmpty(board)).toEqual([]);
}

const testIsFinished = () => {
  let board = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];
  expect(isFinished(board)).toEqual(false);
  board = ['_', '_', '_', 'X', 'X', 'X', '_', '_', '_'];
  expect(isFinished(board)).toEqual('X won');
  board = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'];
  expect(isFinished(board)).toEqual('draw');
  board = ['_', 'O', '_', '_', 'O', '_', '_', 'O', '_'];
  expect(isFinished(board)).toEqual('O won');
  board = ['_', '_', 'X', '_', 'X', '_', 'X', '_', '_'];
  expect(isFinished(board)).toEqual('X won');
}

const testFindPreWin = () => {
  let board = ['X', '_', 'X', '_', '_', '_', '_', '_', '_'];
  let player = 'X';
  expect(findPreWin(board, player)).toEqual([1]);
  board = ['O', '_', '_', '_', 'X', 'O', 'O', '_', '_'];
  player = 'O';
  expect(findPreWin(board, player)).toEqual([3]);
  board = ['O', 'X', 'O', 'X', 'O', '_', '_', 'X', '_'];
  player = 'O';
  expect(findPreWin(board, player)).toEqual([6,8]);
}

const testMakeMove = () => {
  let board = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];
  let player = 'X';
  expect(makeMove(board, player)).toEqual(0);
  board = ['O', 'X', 'X', 'X', 'X', 'O', 'O', 'X', 'X'];
  player = 'O';
  expect(makeMove(board, player)).toEqual(-1);
  board = ['O', '_', '_', '_', 'X', 'O', 'O', '_', '_'];
  player = 'O';
  expect(makeMove(board, player)).toEqual(3);
  board = ['O', '_', '_', '_', 'X', 'O', 'O', '_', '_'];
  player = 'X';
  expect(makeMove(board, player)).toEqual(3);
}

const testCalculateScore = () => {
  let board = ['X', 'X', 'X', '_', 'O', 'O', '_', '_', '_'];
  let player = 'X';
  expect(calculateScore(board, player)).toEqual(7); //X won
  board = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'];
  player = 'O';
  expect(calculateScore(board, player)).toEqual(0); //draw
  board = ['O', 'X', 'O', 'O', 'X', 'X', 'O', 'X', '_'];
  player = 'X';
  expect(calculateScore(board, player)).toEqual(-6); //O won
}

testfindEmpty();
testIsFinished();
testFindPreWin();
testMakeMove();
testCalculateScore();

console.log('tests pass');