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
  var winCells = [];
  empty.forEach(function(cell) {
    var newBoard = board.slice();
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
  var score = 0;
  const opp = player === 'X'? 'O' : 'X'
  if (isFinished(board) === player + ' won') {
    var steps = board.filter((cell) => {
      return cell === player}).length;
    score = 10 - steps;
  }
  if (isFinished(board) === opp + ' won') {
    var steps = board.filter((cell) => {
      return cell === opp}).length;
    score = -10 + steps;
  }
  return score;
}

function minMax(board, player) {
  if (isFinished(board)) {
    return calculateScore(board, player);
  } else {
    var possibleMoves = [];
    var score = player === 'X' ? -20 : 20;
    findEmpty(board).forEach((cell) => {
      possibleMoves.push([...board.slice(0, cell), player, ...board.slice(cell + 1)]);
    });
    possibleMoves.forEach((nextBoard) => {
      var nextPlayer = player === 'X'? 'O' : 'X';
      var nextScore = minMax(nextBoard, nextPlayer);
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
  var availableCells = findEmpty(board);
  var availableMove = availableCells.map((cell) => {
    var minMaxValue = minMax([...board.slice(0, cell), player, ...board.slice(cell + 1)]);
    var tempObj = {};
    tempObj[cell] = minMaxValue;
    return tempObj
  });
  availableMove.sort((x, y) => {
    return (y[Object.keys(y)[0]] - x[Object.keys(x)[0]]);
  });
  // console.log(availableMove);
  if (player === 'O') {
    return Object.keys(availableMove[0])[0];
  }
  if (player === 'X') {
    return Object.keys(availableMove[availableMove.length - 1])[0];
  }
}

module.exports = { findEmpty, isFinished, findPreWin, makeMove, calculateScore, minMax };
