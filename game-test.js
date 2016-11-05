const expect = require('expect');

const { findEmpty, isFinished, makeMove, calculateScore, minMax } = require('./game.js');

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
  expect(isFinished(board)).toEqual('X');
  board = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'];
  expect(isFinished(board)).toEqual('draw');
  board = ['_', 'O', '_', '_', 'O', '_', '_', 'O', '_'];
  expect(isFinished(board)).toEqual('O');
  board = ['_', '_', 'X', '_', 'X', '_', 'X', '_', '_'];
  expect(isFinished(board)).toEqual('X');
}

const testCalculateScore = () => {
  let board = ['X', 'X', 'X', '_', 'O', 'O', '_', '_', '_'];
  let player = 'X';
  expect(calculateScore(board, player)).toEqual(-17); //X won
  board = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'];
  player = 'O';
  expect(calculateScore(board, player)).toEqual(0); //draw
  board = ['O', 'X', 'O', 'O', 'X', 'X', 'O', 'X', '_'];
  player = 'X';
  expect(calculateScore(board, player)).toEqual(16); //O won
}

const testMinMax = () => {
  let board = ['X', 'X', 'X', '_', 'O', 'O', '_', '_', '_'];
  let player = 'X';
  expect(minMax(board, player, player)).toEqual(-17); //X won
  board = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'];
  player = 'O';
  expect(minMax(board, player, player)).toEqual(0); //draw
  board = ['O', 'X', 'O', 'O', 'X', 'X', 'O', 'X', '_'];
  player = 'X';
  expect(minMax(board, player, player)).toEqual(16); //O won
  board = ['O', 'X', 'O', '_', 'X', 'X', 'O', 'X', '_'];
  player = 'O';
  expect(minMax(board, player, player)).toEqual(16);
  board = ['O', 'X', 'O', '_', 'X', '_', 'X', 'O', '_'];
  player = 'O';
  expect(minMax(board, player, player)).toEqual(0);
}

const testMakeMove = () => {
  let board = ['O', 'X', 'O', '_', 'X', '_', 'X', 'O', '_'];
  let player = 'X';
  expect(makeMove(board, player)).toEqual(3);
  board = ['X', '_', 'O', '_', 'O', '_', 'X', '_', '_'];
  player = 'X';
  expect(makeMove(board, player)).toEqual(3);
  board = ['X', '_', '_', '_', '_', '_', '_', '_', '_'];
  player = 'O';
  expect(makeMove(board, player)).toEqual(4);
  board = ['X', 'O', '_', 'O', 'O', 'X', 'X', '_', '_'];
  player = 'X';
  expect(makeMove(board, player)).toEqual(7);
}

testfindEmpty();
testIsFinished();
testCalculateScore();
testMinMax();
testMakeMove();

console.log('tests pass');