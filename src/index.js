import React from 'react';
import ReactDOM from 'react-dom';
import {Engine} from './Engine.js'
import './index.css';

function createEmptyBoard(){
  let tmpBoard = [];
  for(var i = 0; i < 8; i++){
    tmpBoard.push(Array(8).fill(null));
  }
  return tmpBoard;
}

function Square(props) {
  // console.log(props);
  let classes = "Square";
  classes += ( props.isPrimary ? " Square-primary" : " Square-accent" );
  const src = (props.piece === null ? "" : props.piece.src);
  return (
    <button onClick={() => props.onClick(props.location)}
            className={classes}>
      <img
        src={src}
        alt=""
        className="piece"/>
    </button>
  );
}

class Board extends React.Component{

  renderSquare(props){
    return <Square
      key={props.location}
      location={props.location}
      onClick={props.onClick}
      piece={props.piece}
      isPrimary={props.isPrimary}
    />
  }

  render(){
    // console.log("Rendering Board");
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'].reverse();
    const pieces = this.props.board.pieces;
    let board = [];
    let isPrimary = true;
    const context = this;

    // Push Pieces in a row from a, b, -> g, h
    // Do this top down in the ranks from 8, 7, -> 2, 1
    ranks.forEach(function(rank) {
      let row = [];
      files.forEach(function(file) {
        row.push(context.renderSquare({
          isPrimary : isPrimary,
          piece : pieces[file+rank],
          onClick : context.props.onClick,
          location: file+rank,
        }));
        isPrimary = !isPrimary;
      });
      board.push(<div key={rank} className="board-row">{row}</div>);
      isPrimary = !isPrimary;
    });

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
        <button onClick={this.props.newGame} className="btn">New Game</button>
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
    console.log(selectedSquare);

    // Selecting Source Square
    if(this.state.move.src === null){
      let move = Object.assign({}, this.state.move);
      move.src = selectedSquare;
      move.dest = null;
        this.setState({
        move: move
      });
      // console.log(move);
    // Selected Destination Square
    } else {
      let completeMove = Object.assign({}, this.state.move);
      completeMove.dest = selectedSquare;
      // console.log(completeMove);
      // Do this with state
      this.props.engine.executeMove(completeMove);
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
          <Board onClick={this.handleBoardClick.bind(this)} board={this.props.engine.board}/>
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
      engine: new Engine()
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
