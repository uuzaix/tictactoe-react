const expect = require('expect');

const { findEmpty, isFinished } = require('./game.js');

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

testfindEmpty();

testIsFinished();

console.log('tests pass');