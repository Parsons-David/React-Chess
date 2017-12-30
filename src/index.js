import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import bb from './img/bb.png';
import bk from './img/bk.png';
import bn from './img/bn.png';
import bp from './img/bp.png';
import bq from './img/bq.png';
import br from './img/br.png';
import wb from './img/wb.png';
import wk from './img/wk.png';
import wn from './img/wn.png';
import wp from './img/wp.png';
import wq from './img/wq.png';
import wr from './img/wr.png';

function Square(props) {
  let classes = "Square";
  classes += ( props.isMain ? " Square-main" : " Square-alt" );
  return (
    <button className={classes}>
      <img src={props.piece} alt="" className="piece"/>
    </button>
  );
}

class Board extends React.Component{

  renderSquare(props){
    return <Square piece={props.piece} isMain={props.isMain}/>
  }

  render(){
    const pieces = [
      [br, bb, bn, bk, bq, bn, bb, br],
      Array(8).fill(bp),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(wp),
      [wr, wb, wn, wk, wq, wn, wb, wr],
    ];
    let board = [];
    var isMain = true;
    for(var i = 0; i < 8; i++){
      let row = [];
      for(var j = 0; j < 8; j++){
        row.push(this.renderSquare({
          isMain : isMain,
          piece : pieces[i][j],
        }));
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
