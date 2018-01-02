// TODO : Better Import
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

class Piece{
  constructor(color, location){
    this.color = color;
    this.location = location;
  }

  move(target){
    this.location = target;
  }
}

class Pawn extends Piece{
  constructor(color, location, src){
    super(color, location);
    this.src = (color === 'b' ? bp : wp );
  }
}

class Rook extends Piece{
  constructor(color, location, src){
    super(color, location);
    this.src = (color === 'b' ? br : wr );
  }
}

class Bishop extends Piece{
  constructor(color, location, src){
    super(color, location);
    this.src = (color === 'b' ? bb : wb );
  }
}

class Knight extends Piece{
  constructor(color, location, src){
    super(color, location);
    this.src = (color === 'b' ? bn : wn );
  }
}

class Queen extends Piece{
  constructor(color, location, src){
    super(color, location);
    this.src = (color === 'b' ? bq : wq );
  }
}

class King extends Piece{
  constructor(color, location, src){
    super(color, location);
    this.src = (color === 'b' ? bk : wk );
  }
}

class Board{

  setUpPieces(){
    // Add White Pieces
    let currentColor = 'w';
    // Tmp White Backrow
    let tmpRow = [];
    tmpRow.push(new Rook(currentColor, {f:0,r:0}));
    tmpRow.push(new Knight(currentColor, {f:1,r:0}));
    tmpRow.push(new Bishop(currentColor, {f:2,r:0}));
    tmpRow.push(new Queen(currentColor, {f:3,r:0}));
    tmpRow.push(new King(currentColor, {f:4,r:0}));
    tmpRow.push(new Bishop(currentColor, {f:5,r:0}));
    tmpRow.push(new Knight(currentColor, {f:6,r:0}));
    tmpRow.push(new Rook(currentColor, {f:7,r:0}));
    // Push White Backrow
    this.pieces.push(tmpRow);
    // Tmp White Pawns
    tmpRow = [];
    for(var i = 0; i < 8; i++){
      tmpRow.push(new Pawn(currentColor, {f:i, r:1}));
    }
    // Push White Pawns
    this.pieces.push(tmpRow);

    // Middle Board Rows
    this.pieces.push(Array(8).fill(null));
    this.pieces.push(Array(8).fill(null));
    this.pieces.push(Array(8).fill(null));
    this.pieces.push(Array(8).fill(null));

    // Black Pieces
    currentColor = 'b';
    // Tmp Black Pawns
    tmpRow = [];
    for(var i = 0; i < 8; i++){
      tmpRow.push(new Pawn(currentColor, {f:i, r:1}));
    }
    // Push Black Pawns
    this.pieces.push(tmpRow);
    // Tmp White Backrow
    tmpRow = [];
    tmpRow.push(new Rook(currentColor, {f:0,r:0}));
    tmpRow.push(new Knight(currentColor, {f:1,r:0}));
    tmpRow.push(new Bishop(currentColor, {f:2,r:0}));
    tmpRow.push(new Queen(currentColor, {f:3,r:0}));
    tmpRow.push(new King(currentColor, {f:4,r:0}));
    tmpRow.push(new Bishop(currentColor, {f:5,r:0}));
    tmpRow.push(new Knight(currentColor, {f:6,r:0}));
    tmpRow.push(new Rook(currentColor, {f:7,r:0}));
    // Push Black Backrow
    this.pieces.push(tmpRow);
  }

  constructor(){
    this.pieces = [];
    this.setUpPieces();
    // console.log(this);
  }

  // setUpPiece(p){
  //   this.pieces[0][0] = new Rook('b', {});
  //   console.log(this.pieces);
  // }


}

class GameEngine{

  constructor(){
    this.board = new Board();
    // this.pieces = this.board.pieces;
    // // Instance Methods
    // this.movePiece = this.movePiece.bind(this);
  }

  movePiece(move){
    // console.log("Moving => ");
    // console.log(move);
    // console.log(this);
    let tmpPiece = this.board.pieces[move.src.file][move.src.rank];
    if(tmpPiece === null){
      return;
    }
    this.board.pieces[move.src.file][move.src.rank] = null;
    this.board.pieces[move.dest.file][move.dest.rank] = tmpPiece;
    tmpPiece.move(move.dest);
    // console.log(move.dest);
    // console.log(tmpPiece.location);
    // console.log(this);
  }

}


export {GameEngine};
