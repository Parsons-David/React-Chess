import {Board} from './Board.js';
import {
  MOVE,
  CAPTURE,
  EN_PASSANT_SETUP,
  EN_PASSANT_CAPTURE,
  CASTLE
} from './utils.js';

class Engine{

  constructor(){
    this.board = new Board();
    // this.pieces = this.board.pieces;
    // // Instance Methods
    // this.movePiece = this.movePiece.bind(this);
  }

  executeMove(move){
    console.log("====START=====");
    console.log("EXECUTTING:");
    console.log(move);
    console.log("=====END======");
    // console.log(this);

    // Get Piece Being Moved
    let tmpPiece = this.board.getPiece(move.src);
    if(tmpPiece === null){
      return;
    }

    console.log("====START=====");
    console.log("MOVING:");
    console.log(tmpPiece);
    console.log("=====END======");

    const access = this.board.getAccess(tmpPiece);
    if(access === null){
      console.log("NULL");
      return;
    }

    console.log("====START=====");
    console.log("ACCESS at " + move.dest + " is :");
    console.log(access);
    console.log("=====END======");
    // console.log(access);
    if(access === MOVE){

    }else if(access === MOVE){

    }else if(access === EN_PASSANT_SETUP){
      console.log("SETTING UP AN EN PASSANT!");
      // TODO : Might not always be a PAWN.
      tmpPiece.markEnPassantable();
    }else if(access === EN_PASSANT_CAPTURE){

    }else if(access === CASTLE){

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
