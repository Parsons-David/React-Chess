import React from 'react';
import ReactDOM from 'react-dom';
import {GameEngine} from './Chess.js'
import './index.css';

function Square(props) {
  // console.log(props);
  let classes = "Square";
  classes += ( props.isPrimary ? " Square-primary" : " Square-accent" );
  return (
    <button onClick={() => props.onClick({row:props.row, col:props.col})}
            className={classes}>
      <img
        src={props.piece}
        alt=""
        className="piece"/>
    </button>
  );
}

class Board extends React.Component{

  renderSquare(props){
    return <Square
      row={props.row}
      col={props.col}
      onClick={props.onClick}
      piece={props.piece}
      isPrimary={props.isPrimary}
    />
  }

  render(){
    // console.log("Rendering Board");
    const pieces = this.props.pieces;
    let board = [];
    var isPrimary = true;
    for(var i = 0; i < 8; i++){
      let row = [];
      for(var j = 0; j < 8; j++){
        row.push(this.renderSquare({
          isPrimary : isPrimary,
          piece : pieces[i][j],
          onClick : this.props.onClick,
          row:i,
          col:j,
        }));
        isPrimary = !isPrimary;
      }
      isPrimary = !isPrimary;
      board.push(<div key={i} className="board-row">{row}</div>);
    }

    return(
      <div className="Board">
        {board}
      </div>
    );
  }
}

class Menu extends React.Component{
  render(){
    return (
      <div className="Menu">
        <button className="btn">New Game</button>
      </div>
    );
  }
}

class Game extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      move: {
        src : null,
        dest : null,
      },
    };
  }

  handleBoardClick(selectedSquare){
    // console.log(selectedSquare);
    // Selecting Source Square
    if(this.state.move.src === null){
      let move = Object.assign({}, this.state.move);
      move.src = selectedSquare;
      move.dest = null;
      this.setState({
        move: move
      });
    // Selected Destination Square
    } else {
      let completeMove = Object.assign({}, this.state.move);
      completeMove.dest = selectedSquare;
      // Do this with state
      // console.log(completeMove);
      this.props.engine.movePiece(completeMove);
      this.setState({
        move: {
          src: null,
          dest: null,
        }
      });
    }
  }

  render(){
    return(
      <div className="Game">
        <div className="game-board">
          <p><strong>Board</strong></p>
          <Board onClick={this.handleBoardClick.bind(this)} pieces={this.props.engine.pieces}/>
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
  constructor(props){
    super(props);
    this.state = {
      engine: new GameEngine()
    }
  }

  newGame(){
    alert("New Game!");
  }

  render(){
    return(
      <div className="App">
        <Header />
        <Menu newGame={this.newGame.bind(this)}/>
        <Game engine={this.state.engine}/>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
