const { isFinished, gameStatusMessage, getStateAfterMove, chooseResponseMove } = require('./game.js');

const defaultState = { board: '         '.split(''), player: '?', status: 'wait', level: '' };

const tictactoe = (state = defaultState, action) => {
  switch (action.type) {
    case 'MOVE_USER':
      if (state.player !== '?' && state.status === 'running' && state.level !== '' && state.board[action.index] === ' ') {
        const stateAfterUserMove = Object.assign({}, state, getStateAfterMove(state.board, state.player, action.index), { status: 'delay' });
        if (isFinished(stateAfterUserMove.board)) {
          return Object.assign({}, stateAfterUserMove, { status: gameStatusMessage(stateAfterUserMove.board) });
        } else {
          return stateAfterUserMove;
        }
      } else {
        return state;
      }

    case 'MOVE_SELF':
      if (state.player !== '?' && state.status === 'delay' && state.level !== '') {
        const nextMove = chooseResponseMove(state.board, state.player, state.level);
        const stateAfterBothMoves = Object.assign({}, state, getStateAfterMove(state.board, state.player, nextMove), { status: 'running' });
        if (!isFinished(stateAfterBothMoves.board)) {
          return stateAfterBothMoves;
        } else {
          return Object.assign({}, stateAfterBothMoves, { status: gameStatusMessage(stateAfterBothMoves.board) })
        }
      } else {
        return state;
      }

    case 'CHOOSE_SYMBOL':
      return Object.assign({}, state, { player: action.symbol, status: 'running' });

    case 'CHOOSE_LEVEL':
      return Object.assign({}, state, { level: action.level });

    case 'RESET':
      return defaultState;

    case 'RECEIVE_STATE':
      return action.payload;

    default:
      return state;
  }
}

module.exports = { tictactoe };