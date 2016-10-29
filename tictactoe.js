const React = require('react');
const ReactDOM = require('react-dom');
const { createStore } = require('redux');

const defaultState = {board: '_________'.split(''), player: 'X'};

const tictactoe = (state=defaultState, action) => {
  switch (action.type) {
    case 'MOVE':
      var newPlayer;
      if (state.player === 'X') {
        newPlayer = 'O'
      } else {
        newPlayer = 'X'
      }
      return Object.assign({}, state, {board:[...state.board.slice(0, parseInt(action.index)), state.player, ...state.board.slice(parseInt(action.index) + 1)], player: newPlayer})
  default:
    return state;
  }
}

module.exports = { tictactoe };

const store = createStore(tictactoe, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// store.subscribe(() => console.log(store.getState()));

// store.dispatch({type: 'MOVE', index: 0});
// store.dispatch({type: 'MOVE', index: 4});
// store.dispatch({type: 'MOVE', index: 8});



const Cell = ({id, content}) => (
  <div className='cell' id={id} onClick={()=> 
    store.dispatch({type: 'MOVE', index: id}
    )}>
    {content}
  </div>
)

const Tictactoe = React.createClass({
  render: function() {
    var cells = this.props.board.map((cell, index) =>
      <Cell key={index} id={index} content={cell} />);
    return (
      <div>
        {cells.slice(0, 3)} <br />
        {cells.slice(3, 6)} <br />
        {cells.slice(6, 9)}
      </div>
      );
  }
});

const render = () => {
  ReactDOM.render(
    <Tictactoe {...store.getState()} />,
    document.getElementById('game')
  );
};

store.subscribe(render);
render();