import {Board} from './Board.js'

class Engine{

  constructor(){
    this.board = new Board();
    // this.pieces = this.board.pieces;
    // // Instance Methods
    // this.movePiece = this.movePiece.bind(this);
  }

  executeMove(move){
    console.log("Moving => ");
    console.log(move);
    // console.log(this);
    let tmpPiece = this.board.pieces[move.src];
    if(tmpPiece === null){
      return;
    }
    console.log(tmpPiece);
    let access = tmpPiece.getAccess(move.dest);
    if(access === null){
      console.log("NULL");
      return;
    }
    this.board.pieces[move.src] = null;
    this.board.pieces[move.dest] = tmpPiece;
    tmpPiece.move(move.dest);
    // console.log(move.dest);
    // console.log(tmpPiece.location);
    // console.log(this);
  }

}


export {Engine};
