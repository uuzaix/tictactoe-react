function findEmpty(board) {
  let emptyCells = [];
  board.forEach(function(el, i) {
    if (board[i] === '_') {
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

module.exports = { findEmpty, isFinished };
// module.exports = { isFinished };
