const React = require('react');
const ReactDOM = require('react-dom');
const { createStore } = require('redux');
const { Provider, connect } = require('react-redux');

const defaultState = {board: '_________'.split(''), player: 'X'};

const tictactoe = (state=defaultState, action) => {
  switch (action.type) {
    case 'MOVE':
      return Object.assign({}, state, {
        board: [
          ...state.board.slice(0, action.index),
          state.player,
          ...state.board.slice(action.index + 1)
        ],
        player: state.player === 'X' ? 'O' : 'X'
      });
  default:
    return state;
  }
}

module.exports = { tictactoe };

const store = createStore(tictactoe, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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


const render = () => {
  ReactDOM.render(
    <Provider store={createStore(tictactoe)}>
      <Tictactoe {...store.getState()} />
    </Provider>,
    document.getElementById('game')
  );
};

store.subscribe(render);
render();
