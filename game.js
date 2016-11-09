const _ = require('lodash');

function findEmpty(board) {
  let emptyCells = [];
  board.forEach(function(el, i) {
    if (el === '_') {
      emptyCells.push(i)
    }
  });
  return emptyCells;
};

function isFinished(board) {
  //check rows
  for (var i = 0; i <= 6; i += 3) {
    if (board[i] !== '_' && board[i] === board[i + 1] && board[i] === board[i + 2]) {
      return board[i];
    }
  }
  //check column
  for (var i = 0; i <= 2; i += 1) {
    if (board[i] !== '_' && board[i] === board[i + 3] && board[i] === board[i + 6]) {
      return board[i];
    }
  }
  //check diagonal
  for (var i = 0, j = 4; i <= 2; i += 2, j -= 2) {
    if (board[i] !== '_' && board[i] === board[i + j] && board[i] === board[i + 2 * j]) {
      return board[i];
    }
  }
  //check empty cells
  if (findEmpty(board).length === 0) {
    return 'draw';
  }
  return false;
};

function gameStatusMessage(status) {
  let message;
  if (status === 'draw') {
    message = "It's a draw!";
  } else {
    message = status + ' won!';
  }
  return message;
}

function calculateScore(board, AI) {
  let score = 0;
  const opp = AI === 'X' ? 'O' : 'X';
  if (isFinished(board) === AI) {
    const steps = board.filter((cell) => {
      return cell === AI}).length;
    score = -20 + steps;
  }
  if (isFinished(board) === opp) {
    const steps = board.filter((cell) => {
      return cell === opp}).length;
    score = 20 - steps;
  }
  return score;
}

function minMax(board, player, AI) {
  if (isFinished(board) !== false) {
    return calculateScore(board, AI);
  } else {
    let possibleMoves = [];
    let score = player === AI ? 20 : -20;
    findEmpty(board).forEach((cell) => {
      possibleMoves.push([...board.slice(0, cell), player, ...board.slice(cell + 1)]);
    });
    possibleMoves.forEach((nextBoard) => {
      const nextPlayer = player === 'X' ? 'O' : 'X';
      const nextScore = minMax(nextBoard, nextPlayer, AI);
      if (player === AI) {
        if (nextScore < score) {
          score = nextScore;
        }
      } else {
        if (nextScore > score) {
          score = nextScore;
        }
      }
    });
    return score;
  }
};

function findAllMoves(board, player) {
  const availableCells = findEmpty(board);
  const opp = player === 'X' ? 'O' : 'X';
  const availableMove = availableCells.map((cell) => {
    const minMaxValue = minMax([...board.slice(0, cell), player, ...board.slice(cell + 1)], opp, player);
    return { cell, minMaxValue }
  });
  return _.sortBy(availableMove, 'minMaxValue');
}

function chooseBestMove(board, player) {
  const sortedMoves = findAllMoves(board, player);
  return _.first(sortedMoves).cell; 
}

function chooseSomeMove(board, player) {
  const sortedMoves = findAllMoves(board, player);
  if (sortedMoves.length >= 2) {
    return sortedMoves[1].cell;
  } else {
    return sortedMoves[0].cell;
  }
}

const getStateAfterMove = (state, index) => {
  return Object.assign({}, state, {
    board: [
      ...state.board.slice(0, index),
      state.player,
      ...state.board.slice(index + 1)
    ],
    player: state.player === 'X' ? 'O' : 'X'
  });
}

const makeMove = (state) => {
  let nextMove;
  if (state.level === 'Profi') {
    nextMove = chooseBestMove(state.board, state.player);
  } else {
    const bestMoveChance = 70;
    if (Math.random() * 100 <= bestMoveChance) {
      nextMove = chooseBestMove(state.board, state.player);
    } else {
      nextMove = chooseSomeMove(state.board, state.player);
    }
  }
  const stateAfterBothMoves = getStateAfterMove(state, nextMove);
  if (isFinished(stateAfterBothMoves.board) === false) {
    return stateAfterBothMoves;
  } else {
    const newStatus = gameStatusMessage(isFinished(stateAfterBothMoves.board));
    return Object.assign({}, stateAfterBothMoves, { status: newStatus })
  }
}

module.exports = { chooseBestMove, chooseSomeMove, isFinished, gameStatusMessage, getStateAfterMove, makeMove };