import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="Square">
    </button>
  );
}

class Board extends React.Component{

  renderSquare(){
    return <Square/>
  }

  render(){
    let board = [];
    for(var i = 0; i < 8; i++){
      let row = [];
      for(var j = 0; j < 8; j++){
        row.push(this.renderSquare());
      }
      board.push(<div key={i} className="board-row">{row}</div>);
    }

    return(
      <div className="Board">
        <p><strong>Board</strong></p>
        {board}
      </div>
    );
  }
}

class Game extends React.Component{
  render(){
    return(
      <div className="Game">
        <div className="game-board">
          <Board/>
        </div>
        <div className="game-info">
          <p><strong>Info</strong></p>
        </div>
      </div>
    );
  }
}

class Header extends React.Component{
  render(){
    return(
      <div className="Header">
        <h1>React Chess</h1>
        <p><a href="https://github.com/Parsons-David/React-Chess">Source</a></p>
      </div>
    );
  }
}

class App extends React.Component{
  render(){
    return(
      <div className="App">
        <Header />
        <Game />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
