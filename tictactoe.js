const React = require('react');
const ReactDOM = require('react-dom');
const { createStore } = require('redux');
const { Provider, connect } = require('react-redux');
const { chooseBestMove, chooseSomeMove, isFinished, gameStatusMessage, getStateAfterMove, makeMove } = require('./game.js');

const defaultState = { board: '_________'.split(''), player: '?', status: 'wait', level: '' };

const tictactoe = (state = defaultState, action) => {
  switch (action.type) {
    case 'MOVE':
      if (state.player !== '?' && state.status === 'running' && state.level !== '' && state.board[action.index] === '_') {
        const stateAfterUserMove = getStateAfterMove(state, action.index);
        if (isFinished(stateAfterUserMove.board) === false) {
          return makeMove(stateAfterUserMove);
        } else {
          const newStatus = gameStatusMessage(isFinished(stateAfterUserMove.board));
          return Object.assign({}, stateAfterUserMove, { status: newStatus })
        }

      } else {
        return state;
      }

    case 'CHOOSE_SYMBOL':
      return Object.assign({}, state, { player: action.symbol, status: 'running' });

    case 'CHOOSE_LEVEL':
      return Object.assign({}, state, { level: action.level });

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
        <p>It's {player} turn </p>
      )
    } else {
      return (
        <p>{status}</p>
      )
    }
  }
};

const SymbolChooser = connect(
  mapStateToSymProps,
  mapDispatchToSymProps
)(PlayerSymbol);

const mapStateToLevelProps = (state) => {
  return {
    level: state.level
  }
};

const mapDispatchToLevelProps = (dispatch) => {
  return {
    onLevelClick: (level) => {
      dispatch({ type: 'CHOOSE_LEVEL', level: level })
    }
  }
};

const Level = ({level, onLevelClick}) => {
  if (level === '') {
    return (
      <p>Choose level
        <a href='#' onClick={() => onLevelClick('Profi')}> Profi </a> or
        <a href='#' onClick={() => onLevelClick('Novice')}> Novice </a></p>
    )
  } else {
    return (
      <p>Level: {level}</p>
    )
  }
};

const LevelChooser = connect(
  mapStateToLevelProps,
  mapDispatchToLevelProps
)(Level);

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
    <SymbolChooser />
    <Tictactoe />
    <LevelChooser />
  </div>
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('game')
);
