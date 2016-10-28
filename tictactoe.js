const React = require('react');
const ReactDOM = require('react-dom');


const Cell = ({id, content}) => (
  <span id={id}>{content}</span>
)

const Tictactoe = React.createClass({
  render() {
    var rows = [];
    // const cells = (
    //   <div>
    //   {this.props.board.map((cell, index) =>
    //     <Cell key={index} content={cell} />)}
    //   </div>
    // );
    this.props.board.forEach(function(cell, index) {
      rows.push(<Cell key={index} id={index} content={cell} />)
    });
    return (
      <div>
        {rows.slice(0, 3)} <br />
        {rows.slice(3, 6)} <br />
        {rows.slice(6, 9)} <br />
      </div>
    )
  }
}
)

var gameBord = ['O', 'O', 'O', 'X', 'X', 'X', 'O', 'O', 'O'];

const render = () => {
  ReactDOM.render(
    <Tictactoe board={gameBord} />,
    document.getElementById('game')
  );
};

render();