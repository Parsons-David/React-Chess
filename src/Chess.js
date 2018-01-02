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

const move = 'm';
const capture = 'c'

// Valid Position on Board
function validPosition(pos){
  if(pos === null || pos.file === null || pos.rank === null){
    return false;
  }
  if(pos.file > 7 || pos.file < 0 || pos.rank > 7 || pos.rank < 0){
    return false;
  }
  return true;
}

// Assign Simple Move
function assignMob_M(mob, pos){
  // console.log(mob);
  // console.log(pos);
  if(validPosition(pos)){
    mob[pos.file][pos.rank] = move;
  }
}

// Assign Capture
function assignMob_C(mob, pos){
    if(validPosition(pos)){
      mob[pos.file][pos.rank] = capture;
    }
}

function createEmptyBoard(){
  let tmpBoard = [];
  for(var i = 0; i < 8; i++){
    tmpBoard.push(Array(8).fill(null));
  }
  return tmpBoard;
}


class Piece{
  constructor(color, location){
    this.color = color;
    this.location = location;
  }

  getAccess(target){
    return this.mobility[target.file][target.rank];
  }

  move(target){
    this.location = target;
  }
}

class Pawn extends Piece{
  constructor(color, location, src){
    super(color, location);
    this.src = (color === 'b' ? bp : wp );
    this.mobility = createEmptyBoard();
    // this.initialMobility();
  }

  initialMobility(){
    let tmpPos = Object.assign({}, this.location);
    let dir = (this.color === 'b' ? -1 : 1 );

    // console.log(this);
    tmpPos.rank += (1 * dir);
    assignMob_M(this.mobility, tmpPos);
    // console.log(this);
    tmpPos.file -= 1;
    assignMob_C(this.mobility, tmpPos);
    // console.log(this);
    tmpPos.file += 2;
    assignMob_C(this.mobility, tmpPos);
    // console.log(this);
    tmpPos.file -= 1;
    tmpPos.rank += (1 * dir);
    assignMob_M(this.mobility, tmpPos);
    // console.log(this);
  }

  updateMobility(){

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

  createNewBoard(){
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    let board = {};
    files.forEach(function(file){
      ranks.forEach(function (rank) {
        board[file+rank] = null;
      });
    });
    // Place Pawns
    files.forEach(function(file){
      board[file+'2'] = new Pawn('w', file+'2');
      board[file+'7'] = new Pawn('b', file+'7');
    });
    // Place Rooks
    ['a', 'h'].forEach(function(file){
      board[file+'1'] = new Rook('w', file+'1');
      board[file+'8'] = new Rook('b', file+'8');
    });
    // Place Knights
    ['b', 'g'].forEach(function(file){
      board[file+'1'] = new Knight('w', file+'1');
      board[file+'8'] = new Knight('b', file+'8');
    });
    // Place Bishops
    ['c', 'f'].forEach(function(file){
      board[file+'1'] = new Bishop('w', file+'1');
      board[file+'8'] = new Bishop('b', file+'8');
    });
    // Place Queen
    ['d'].forEach(function(file){
      board[file+'1'] = new Queen('w', file+'1');
      board[file+'8'] = new Queen('b', file+'8');
    });
    // Place King
    ['e'].forEach(function(file){
      board[file+'1'] = new King('w', file+'1');
      board[file+'8'] = new King('b', file+'8');
    });
    // let board = Array(8);
    // for(let i = 0; i < 8; i++){
    //   for()
    // }
    console.log(board);
    this.pieces = board;
  }

  setUpPieces(){
    // Add White Pieces
    let currentColor = 'w';
    // Tmp White Backrow
    let tmpRow = [];
    tmpRow.push(new Rook(currentColor, {file:0,rank:0}));
    tmpRow.push(new Knight(currentColor, {file:1,rank:0}));
    tmpRow.push(new Bishop(currentColor, {file:2,rank:0}));
    tmpRow.push(new Queen(currentColor, {file:3,rank:0}));
    tmpRow.push(new King(currentColor, {file:4,rank:0}));
    tmpRow.push(new Bishop(currentColor, {file:5,rank:0}));
    tmpRow.push(new Knight(currentColor, {file:6,rank:0}));
    tmpRow.push(new Rook(currentColor, {file:7,rank:0}));
    // Push White Backrow
    this.pieces.push(tmpRow);
    // Tmp White Pawns
    tmpRow = [];
    for(var i = 0; i < 8; i++){
      tmpRow.push(new Pawn(currentColor, {file:i, rank:1}));
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
      tmpRow.push(new Pawn(currentColor, {file:i, rank:6}));
    }
    // Push Black Pawns
    this.pieces.push(tmpRow);
    // Tmp White Backrow
    tmpRow = [];
    tmpRow.push(new Rook(currentColor, {file:0,rank:7}));
    tmpRow.push(new Knight(currentColor, {file:1,rank:7}));
    tmpRow.push(new Bishop(currentColor, {file:2,rank:7}));
    tmpRow.push(new Queen(currentColor, {file:3,rank:7}));
    tmpRow.push(new King(currentColor, {file:4,rank:7}));
    tmpRow.push(new Bishop(currentColor, {file:5,rank:7}));
    tmpRow.push(new Knight(currentColor, {file:6,rank:7}));
    tmpRow.push(new Rook(currentColor, {file:7,rank:7}));
    // Push Black Backrow
    this.pieces.push(tmpRow);
  }

  constructor(){
    this.pieces = [];
    this.setUpPieces();
    this.createNewBoard();
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
    console.log(tmpPiece);
    let access = tmpPiece.getAccess(move.dest);
    if(access === null){
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
