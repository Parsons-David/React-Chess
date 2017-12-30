import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  let classes = "Square";
  classes += ( props.isMain ? " Square-main" : " Square-alt" );
  return (
    <button className={classes}>
    </button>
  );
}

class Board extends React.Component{

  renderSquare(isMain){
    return <Square isMain={isMain}/>
  }

  render(){
    let board = [];
    var isMain = true;
    for(var i = 0; i < 8; i++){
      let row = [];
      for(var j = 0; j < 8; j++){
        row.push(this.renderSquare(isMain));
        isMain = !isMain;
      }
      isMain = !isMain;
      board.push(<div key={i} className="board-row">{row}</div>);
    }

    return(
      <div className="Board">
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
          <p><strong>Board</strong></p>
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
