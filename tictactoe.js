const React = require('react');
const ReactDOM = require('react-dom');
const { createStore } = require('redux');

const defaultState = {board: ['_', '_', '_', '_', '_', '_', '_', '_', '_'], player: 'X'};

const tictactoe = (state=defaultState, action) => {
  switch (action.type) {
    case 'MOVE':
      return Object.assign({}, state, {board:[...state.board.slice(0, action.index), state.player, ...state.board.slice(action.index + 1)]})
  }
}

module.exports = { tictactoe };

const store = createStore(tictactoe, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// store.subscribe(() => console.log(store.getState()));

// store.dispatch({type: 'MOVE', index: 0});
// store.dispatch({type: 'MOVE', index: 4});
// store.dispatch({type: 'MOVE', index: 8});



const Cell = ({id, content}) => (
  <span id={id} onClick={()=> 
    store.dispatch({type: 'MOVE', index: {id}}
    )}>
    {content}
  </span>
)

const Tictactoe = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.board.map((cell, index) =>
          <Cell key={index} content={cell} />)}
      </div>
    );
  }
});

// var gameBord = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];

const render = () => {
  ReactDOM.render(
    <Tictactoe {...store.getState()} />,
    document.getElementById('game')
  );
};

store.subscribe(render);
render();