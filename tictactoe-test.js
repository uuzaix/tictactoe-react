const expect = require('expect');

const { tictactoe } = require('./tictactoe.js');
const { findEmpty, isFinished } = require('./game.js');

const testMove = () => {
  let stateBefore = {board: ['_', '_', '_', '_', '_', '_', '_', '_', '_'], player: 'X'};
  let stateAfter = {board: ['X', '_', '_', '_', '_', '_', '_', '_', '_'], player: 'X'};
  let action = {type: 'MOVE', index: 0};
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {board: ['_', '_', '_', '_', '_', '_', '_', '_', '_'], player: 'O'};
  stateAfter = {board: ['_', '_', '_', '_', 'O', '_', '_', '_', '_'], player: 'O'};
  action = {type: 'MOVE', index: 4};
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
}

const testChooseSymbol = () => {
  let stateBefore = {board: ['_', '_', '_', '_', '_', '_', '_', '_', '_'], player: '?'};
  let stateAfter = {board: ['_', '_', '_', '_', '_', '_', '_', '_', '_'], player: 'X'};
  let action = {type: 'CHOOSE_SYMBOL', symbol: 'X'};
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {board: ['_', '_', '_', '_', '_', '_', '_', '_', '_'], player: '?'};
  stateAfter = {board: ['_', '_', '_', '_', '_', '_', '_', '_', '_'], player: 'O'};
  action = {type: 'CHOOSE_SYMBOL', symbol: 'O'};
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
}

testChooseSymbol();
testChooseSymbol();
console.log('tests pass');