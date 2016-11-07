const React = require('react');
const ReactDOM = require('react-dom');
const { createStore } = require('redux');
const { Provider, connect } = require('react-redux');
const { makeBestMove, makeSomeMove, isFinished, gameStatusMessage } = require('./game.js');

const defaultState = { board: '_________'.split(''), player: '?', status: 'wait' };

const tictactoe = (state = defaultState, action) => {
  switch (action.type) {
    case 'MOVE':
      if (state.player !== '?' && state.status === 'running') {
        const stateAfterUserMove = Object.assign({}, state, {
          board: [
            ...state.board.slice(0, action.index),
            state.player,
            ...state.board.slice(action.index + 1)
          ],
          player: state.player === 'X' ? 'O' : 'X'
        });
        if (isFinished(stateAfterUserMove.board) === false) {
          const bestMoveChance = 70;
          let nextMove;
          if (Math.random()*100 <= bestMoveChance) {
            nextMove = makeBestMove(stateAfterUserMove.board, stateAfterUserMove.player);
          } else {
            nextMove = makeSomeMove(stateAfterUserMove.board, stateAfterUserMove.player);
          }
          const stateAfterBothMoves = Object.assign({}, stateAfterUserMove, {
            board: [
              ...stateAfterUserMove.board.slice(0, nextMove),
              stateAfterUserMove.player,
              ...stateAfterUserMove.board.slice(nextMove + 1)
            ],
            player: stateAfterUserMove.player === 'X' ? 'O' : 'X'
          });
          if (isFinished(stateAfterBothMoves.board) === false) {
            return stateAfterBothMoves;
          } else {
            const newStatus = gameStatusMessage(isFinished(stateAfterBothMoves.board));
            return Object.assign({}, stateAfterBothMoves, { status: newStatus })
          }
        } else {
          const newStatus = gameStatusMessage(isFinished(stateAfterUserMove.board));
          return Object.assign({}, stateAfterUserMove, { status: newStatus })
        }

      } else {
        return state;
      }

    case 'CHOOSE_SYMBOL':
      return Object.assign({}, state, { player: action.symbol, status: 'running' })
    default:
      return state;
  }
}

module.exports = { tictactoe };

const store = createStore(tictactoe, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const mapStateToSymProps = (state) => {
  return {
    player: state.player,
    status: state.status
  }
};

const mapDispatchToSymProps = (dispatch) => {
  return {
    onSymbolClick: (symbol) => {
      dispatch({ type: 'CHOOSE_SYMBOL', symbol: symbol })
    }
  }
};

const PlayerSymbol = ({player, status, onSymbolClick}) => {
  if (player === '?') {
    return (
      <p>Choose your symbol
        <a href='#' onClick={() => onSymbolClick('X')}> X </a> or
        <a href='#' onClick={() => onSymbolClick('O')}> O </a></p>)
  } else {
    if (status === "running") {
      return (
        <p>It's {player} turn</p>
      )
    } else {
      return (
        <p>{status}</p>
      )
    }

  }
};

const Chooser = connect(
  mapStateToSymProps,
  mapDispatchToSymProps
)(PlayerSymbol);

const Cell = ({id, content, onCellClick}) => (
  <div className='cell' id={id} onClick={() =>
    onCellClick(id)}>
    {content}
  </div>
);

const Board = ({board, onCellClick}) => {
  const cells = board.map((cell, index) =>
    <Cell key={index} id={index} content={cell} onCellClick={onCellClick} />
  );
  return (
    <div>
      {cells.slice(0, 3)} <br />
      {cells.slice(3, 6)} <br />
      {cells.slice(6, 9)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    board: state.board
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCellClick: (id) => {
      dispatch({ type: 'MOVE', index: id })
    }
  }
};

const Tictactoe = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);


const App = () => (
  <div>
    <Chooser />
    <Tictactoe />
  </div>
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('game')
);
