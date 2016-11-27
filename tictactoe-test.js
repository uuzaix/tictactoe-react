const expect = require('expect');

const { tictactoe } = require('./reducer-tictactoe.js');
const { findEmpty, isFinished } = require('./game.js');

const testMoveUser = () => {
  let stateBefore = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: 'X', status: 'running', level: 'Profi' };
  let stateAfter = { board: ['X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: 'O', status: 'delay', level: 'Profi' };
  let action = { type: 'MOVE_USER', index: 0 };
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
  stateBefore = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: 'O', status: 'running', level: 'Profi' };
  stateAfter = { board: [' ', ' ', ' ', ' ', 'O', ' ', ' ', ' ', ' '], player: 'X', status: 'delay', level: 'Profi' };
  action = { type: 'MOVE_USER', index: 4 };
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
}

const testMoveSelf = () => {
  let stateBefore = { board: ['O', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: 'X', status: 'delay', level: 'Profi' };
  let stateAfter = { board: ['O', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' '], player: 'O', status: 'running', level: 'Profi' };
  let action = { type: 'MOVE_SELF' };
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
  stateBefore = { board: [' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' '], player: 'O', status: 'delay', level: 'Profi' };
  stateAfter = { board: ['O', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' '], player: 'X', status: 'running', level: 'Profi' };
  action = { type: 'MOVE_SELF' };
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
}

const testChooseSymbol = () => {
  let stateBefore = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: '?', status: 'wait', level: 'Profi' };
  let stateAfter = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: 'X', status: 'running', level: 'Profi' };
  let action = { type: 'CHOOSE_SYMBOL', symbol: 'X' };
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
  stateBefore = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: '?', status: 'wait', level: 'Profi' };
  stateAfter = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: 'O', status: 'running', level: 'Profi' };
  action = { type: 'CHOOSE_SYMBOL', symbol: 'O' };
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
}

const testChooseLevel = () => {
  let stateBefore = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: '?', status: 'wait', level: '' };
  let stateAfter = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: '?', status: 'wait', level: 'Profi' };
  let action = { type: 'CHOOSE_LEVEL', level: 'Profi' };
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
  stateBefore = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: '?', status: 'wait', level: '' };
  stateAfter = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: '?', status: 'wait', level: 'Novice' };
  action = { type: 'CHOOSE_LEVEL', level: 'Novice' };
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
}

const testReset = () => {
  let stateBefore = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: '?', status: 'wait', level: '' };
  let stateAfter = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: '?', status: 'wait', level: '' };
  let action = { type: 'RESET' };
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
  stateBefore = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: '?', status: 'wait', level: 'Novice' };
  stateAfter = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: '?', status: 'wait', level: '' };
  action = { type: 'RESET' };
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
  stateBefore = { board: [' ', ' ', ' ', 'X', ' ', 'O', ' ', ' ', ' '], player: 'X', status: 'running', level: 'Profi' };
  stateAfter = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: '?', status: 'wait', level: '' };
  action = { type: 'RESET' };
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
  stateBefore = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: 'O', status: 'running', level: 'Novice' };
  stateAfter = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: '?', status: 'wait', level: '' };
  action = { type: 'RESET' };
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
  stateBefore = { board: [' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', ' '], player: 'O', status: 'delay', level: 'Novice' };
  stateAfter = { board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], player: '?', status: 'wait', level: '' };
  action = { type: 'RESET' };
  expect(tictactoe(stateBefore, action)).toEqual(stateAfter);
}

testMoveUser();
testMoveSelf();
testChooseSymbol();
testChooseLevel();
testReset();
console.log('tests pass');