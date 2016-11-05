const React = require('react');
const ReactDOM = require('react-dom');
const { createStore } = require('redux');
const { Provider, connect } = require('react-redux');
const { makeMove } = require('./game.js');

const defaultState = {board: '_________'.split(''), player: '?'};

const tictactoe = (state=defaultState, action) => {
  switch (action.type) {
    case 'MOVE':
      const tempState = Object.assign({}, state, {
        board: [
          ...state.board.slice(0, action.index),
          state.player,
          ...state.board.slice(action.index + 1)
        ],
        player: state.player === 'X' ? 'O' : 'X'
      });
      const nextMove = makeMove(tempState.board, tempState.player);
      return Object.assign({}, tempState, {
        board: [
          ...tempState.board.slice(0, nextMove),
          tempState.player,
          ...tempState.board.slice(nextMove + 1)
        ],
        player: tempState.player === 'X' ? 'O' : 'X'
      });

    case 'CHOOSE_SYMBOL':
      return Object.assign({}, state, {player: action.symbol})
    default:
    return state;
  }
}

module.exports = { tictactoe };

const store = createStore(tictactoe, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const mapStateToSymProps = (state) => {
  return {
    player: state.player
  }
};

const mapDispatchToSymProps = (dispatch) => {
  return {
    onSymbolClick: (symbol) => {
      dispatch({type: 'CHOOSE_SYMBOL', symbol: symbol})
    }
  }
};

const PlayerSymbol = ({player, onSymbolClick}) => {
  if (player === '?') {
    return (
      <p>Choose your symbol
        <a href='#' onClick={() => onSymbolClick('X')}> X </a> or 
        <a href='#'onClick={() => onSymbolClick('O')}> O </a></p>)
  } else {
    return(
      <p>It's {player} turn</p>
    )
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
  console.log(board);
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
      dispatch({type: 'MOVE', index: id})
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
