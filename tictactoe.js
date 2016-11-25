const React = require('react');
const ReactDOM = require('react-dom');
const { createStore, applyMiddleware } = require('redux');
const { Provider, connect } = require('react-redux');
const ReduxThunk = require('redux-thunk').default;
const { isFinished, gameStatusMessage, getStateAfterMove, chooseResponseMove } = require('./game.js');
const firebase = require('./firebase.js');
const { writeUserState, login, isAuth, initAuth } = require('./firebase.js')

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

const store = createStore(tictactoe, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(ReduxThunk));

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
    if (status === "running" || status === 'delay') {
      return (
        <p>{"It's "}{player} turn </p>
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
    onCellClick(id)} className={(content === ' ' && status === 'running') ? 'cell empty' : 'cell'}>
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

const moveAsync = (id) => {
  return dispatch => {
    dispatch({ type: 'MOVE_USER', index: id });
    setTimeout(() => {
      dispatch({ type: 'MOVE_SELF' })
    }, 2000);
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCellClick: (id) => {
      dispatch(moveAsync(id));
      writeUserState(store.getState())
    }
  }
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onCellClick: (id) => {
//       dispatch({ type: 'MOVE', index: id });
//       writeUserState(store.getState())
//     }
//   }
// };

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

////////////////////////

const loginUser = () => {
  return dispatch => {
    return login().then(
      state => dispatch(recieveState(state))
    );
  };
};

const recieveState = (state) => {
  return { type: 'RECEIVE_STATE', payload: state }
}

const mapStateToLoginProps = (state) => {
  return {
  }
};

const mapDispatchToLoginProps = (dispatch) => {
  return {
    onLoginClick: () => {
      dispatch(loginUser())
    }
  }
};

const LoginButton = ({onLoginClick}) => {
  return (
    <button id='login' onClick={() =>
      onLoginClick()}>Login</button>
  )
};
const Login = connect(
  mapStateToLoginProps,
  mapDispatchToLoginProps
)(LoginButton);

////////////////////////////

const App = () => (
  <div>
    <Login />
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
//draft version for firebase auth 
// function render() {
//   ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     document.getElementById('game')
//   );
// }


// initAuth(store.dispatch);
// render();



store.subscribe(() => {
  if (store.getState().status !== 'wait' && store.getState().status !== 'running' && store.getState().status !== 'delay') {
    setTimeout(() => {
      store.dispatch({
        type: 'RESET',
      });
    }, 3500);
  }
});
