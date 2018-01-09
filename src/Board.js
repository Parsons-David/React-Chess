import {
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King
} from './Pieces.js';

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
    console.log(board);
    this.pieces = board;
  }

  constructor(){
    this.pieces = [];
    this.createNewBoard();
    // console.log(this);
  }

  // setUpPiece(p){
  //   this.pieces[0][0] = new Rook('b', {});
  //   console.log(this.pieces);
  // }


}
export {Board};
