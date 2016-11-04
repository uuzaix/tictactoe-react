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
    if (board[i] !== '_' && board[i] === board[i+1] && board[i] === board[i+2]) {
      return board[i] + ' won';
    }
  }
  //check column
  for (var i = 0; i <= 2; i += 1) {
    if (board[i] !== '_' && board[i] === board[i+3] && board[i] === board[i+6]) {
      return board[i] + ' won';
    }
  }
  //check diagonal
    for (var i = 0, j = 4; i <= 2; i += 2, j -= 2) {
    if (board[i] !== '_' && board[i] === board[i+j] && board[i] === board[i+2*j]) {
      return board[i] + ' won';
    }
  }
  //check empty cells
  if (findEmpty(board).length === 0) {
    return 'draw';
  }
  return false;
};

function findPreWin(board, player) {
  const empty = findEmpty(board);
  let winCells = [];
  empty.forEach(function(cell) {
    const newBoard = board.slice();
    newBoard.splice(cell, 1, player);
    if (isFinished(newBoard) === player + ' won') {
      winCells.push(cell);
    }
  })
  return winCells;
}

// function makeMove(board, player) {
//   if (findEmpty(board).length === 9) {
//     return 0 //should be one of the corners [0, 2, 6, 8]
//   } else if (findEmpty(board).length === 0) {
//     return -1 //?or smth else
//   } else {
//     if (findPreWin(board, player).length !== 0) {
//       return findPreWin(board, player)[0];
//     }
//     const opp = player === 'X'? 'O' : 'X';
//     if (findPreWin(board, opp).length !== 0) {
//       return findPreWin(board, opp)[0];
//     }
//     return findEmpty(board)[0];
//   }
// }

function calculateScore(board, player) {
  let score = 0;
  const opp = player === 'X'? 'O' : 'X'
  if (isFinished(board) === player + ' won') {
    const steps = board.filter((cell) => {
      return cell === player}).length;
    score = 10 - steps;
  }
  if (isFinished(board) === opp + ' won') {
    const steps = board.filter((cell) => {
      return cell === opp}).length;
    score = -10 + steps;
  }
  return score;
}

function minMax(board, player) {
  if (isFinished(board)) {
    return calculateScore(board, player);
  } else {
    let possibleMoves = [];
    let score = player === 'X' ? -20 : 20;
    findEmpty(board).forEach((cell) => {
      possibleMoves.push([...board.slice(0, cell), player, ...board.slice(cell + 1)]);
    });
    possibleMoves.forEach((nextBoard) => {
      const nextPlayer = player === 'X'? 'O' : 'X';
      const nextScore = minMax(nextBoard, nextPlayer);
      if (player === 'X') {
        if (nextScore > score) {
          score = nextScore;
        }
      } else {
        if (nextScore < score) {
          score = nextScore;
        }
      }
    });
    return score;
  }
};

function makeMove(board, player) {
  const availableCells = findEmpty(board);
  const availableMove = availableCells.map((cell) => {
    const minMaxValue = minMax([...board.slice(0, cell), player, ...board.slice(cell + 1)]);
    // console.log({cell, minMaxValue});
    return {cell, minMaxValue}
  });
  const sortedMoves = _.orderBy(availableMove, 'minMaxValue', 'desc');
  // console.log(sortedMoves);
  if (player === 'O') {
    return _.first(sortedMoves).cell;
  }
  if (player === 'X') {
    return _.last(sortedMoves).cell;
  }
}

module.exports = { findEmpty, isFinished, findPreWin, makeMove, calculateScore, minMax };
