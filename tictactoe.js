const React = require('react');
const ReactDOM = require('react-dom');
const { createStore } = require('redux');
const { Provider, connect } = require('react-redux');
const { isFinished, gameStatusMessage, getStateAfterMove, chooseResponseMove } = require('./game.js');

const defaultState = { board: '         '.split(''), player: '?', status: 'wait', level: '' };

const tictactoe = (state = defaultState, action) => {
  switch (action.type) {
    case 'MOVE':
      if (state.player !== '?' && state.status === 'running' && state.level !== '' && state.board[action.index] === ' ') {
        const stateAfterUserMove = Object.assign({}, state, getStateAfterMove(state.board, state.player, action.index)
        );
        if (isFinished(stateAfterUserMove.board) === false) {
          const nextMove = chooseResponseMove(stateAfterUserMove.board, stateAfterUserMove.player, stateAfterUserMove.level);
          const stateAfterBothMoves = Object.assign({}, stateAfterUserMove, getStateAfterMove(stateAfterUserMove.board, stateAfterUserMove.player, nextMove));
          if (isFinished(stateAfterBothMoves.board) === false) {
            return stateAfterBothMoves;
          } else {
            return Object.assign({}, stateAfterBothMoves, { status: gameStatusMessage(stateAfterBothMoves.board) })
          }
        } else {
          return Object.assign({}, stateAfterUserMove, { status: gameStatusMessage(stateAfterUserMove.board) });
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

    default:
      return state;
  }
}

module.exports = { tictactoe };

const store = createStore(tictactoe, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const mapStateToSymProps = (state) => {
  return {
    player: state.player,
    status: state.status,
    level: state.level
  }
};

const mapDispatchToSymProps = (dispatch) => {
  return {
    onSymbolClick: (symbol) => {
      dispatch({ type: 'CHOOSE_SYMBOL', symbol: symbol })
    }
  }
};

const PlayerSymbol = ({player, status, level, onSymbolClick}) => {
  if (level === '') {
    return (
      <p>Are you ready?</p>
    )
  } else if (player === '?' && level !== '') {
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
        <p className='status'>{status}</p>
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
      <p>{level} level</p>
    )
  }
};

const LevelChooser = connect(
  mapStateToLevelProps,
  mapDispatchToLevelProps
)(Level);

const Cell = ({id, content, status, onCellClick}) => (
  <div id={'cell-' + id} onClick={() =>
    onCellClick(id)} className={(content===' ' && status==='running') ? 'cell empty' : 'cell'}>
    
    {content}
  </div>
);

const Board = ({board, status, onCellClick}) => {
  const cells = board.map((cell, index) =>
    <Cell key={index} id={index} content={cell} status={status} onCellClick={onCellClick} />
  );
  return (
    <div className='board'>
      <div className='first-row'>
        {cells.slice(0, 3)}
      </div>
      <div className='second-row'>
        {cells.slice(3, 6)}
      </div>
      <div className='third-row'>
        {cells.slice(6, 9)}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    board: state.board,
    status: state.status
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

const mapStateToResetProps = (state) => {
  return {
  }
};
const mapDispatchToResetProps = (dispatch) => {
  return {
    onResetClick: () => {
      dispatch({ type: 'RESET' })
    }
  }
};

const ResetButton = ({onResetClick}) => {
  return (
    <button id='reset' onClick={() =>
    onResetClick()}>Reset</button>
  )
};
const Reset = connect(
  mapStateToResetProps, 
  mapDispatchToResetProps
)(ResetButton);


const App = () => (
  <div>
    <SymbolChooser />
    <Tictactoe />
    <LevelChooser />
    <Reset />
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('game')
);

store.subscribe(() => {
  if (store.getState().status !== 'wait' && store.getState().status !== 'running') {
    setTimeout(() => {
      store.dispatch({
        type: 'RESET',
      });
    }, 3500);
  }
});
