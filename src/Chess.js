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

const MOVE = 'm';
const CAPTURE = 'c'

function updateMobility(piece){
  if(!(piece instanceof Piece)){
    console.log("updateMobility revieced a Object that wasn't a peice");
  }
  if(piece instanceof Pawn){
    // console.log("Pawn!");
    let dir = (piece.color === 'w' ? 1 : -1);
    let newMob = createEmptyBoard();
    // Moves/Captures in Forward Direction so up for White
    // Move/Capture : [up, (right (+), left (-))]
    let moves = [
      [1 * dir, 0],
      [2 * dir, 0]]
    let captures = [
      [1 * dir, -1],
      [1 * dir, 1]];
    // console.log(piece.location);
    moves.forEach(function (move) {
      let newMove = isValidBoardPostion(move, piece.location);
      if(newMove !== null){
        // console.log('\t' + newMove);
        newMob[newMove] = MOVE;
      }
    });
    captures.forEach(function (capture) {
      let newCap = isValidBoardPostion(capture, piece.location);
      if(newCap !== null){
        // console.log('\t' + newCap);
        newMob[newCap] = CAPTURE;
      }
    });
    // console.log(newMob);
    piece.mobility = Object.assign({}, newMob);

  } else if(piece instanceof Rook){
    // console.log("Rook!");
    let newMob = createEmptyBoard();
    // Moves/Captures in Forward Direction so up for White
    // Move/Capture : [up, (right (+), left (-))]
    let captures = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]];
    // console.log(piece.location);
    captures.forEach(function (capture) {
      let newCap = isValidBoardPostion(capture, piece.location);
      while(newCap !== null){
        // console.log('\t' + newCap);
        newMob[newCap] = CAPTURE;
        newCap = isValidBoardPostion(capture, newCap);
      }
    });
    // console.log(newMob);
    piece.mobility = Object.assign({}, newMob);

  } else if(piece instanceof Knight){
    // console.log("Knight!");
    let newMob = createEmptyBoard();
    // Moves/Captures in Forward Direction so up for White
    // Move/Capture : [up, (right (+), left (-))]
    let captures = [
      [2, -1],
      [2, 1],
      [1, 2],
      [1, -2],
      [-2, -1],
      [-2, 1],
      [-1, 2],
      [-1, -2]];
    // console.log(piece.location);
    captures.forEach(function (capture) {
      let newCap = isValidBoardPostion(capture, piece.location);
      if(newCap !== null){
        // console.log('\t' + newCap);
        newMob[newCap] = CAPTURE;
      }
    });
    // console.log(newMob);
    piece.mobility = Object.assign({}, newMob);

  } else if(piece instanceof Bishop){
    // console.log("Bishop!");
    let newMob = createEmptyBoard();
    // Moves/Captures in Forward Direction so up for White
    // Move/Capture : [up, (right (+), left (-))]
    let captures = [
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1]];
    // console.log(piece.location);
    captures.forEach(function (capture) {
      let newCap = isValidBoardPostion(capture, piece.location);
      while(newCap !== null){
        // console.log('\t' + newCap);
        newMob[newCap] = CAPTURE;
        newCap = isValidBoardPostion(capture, newCap);
      }
    });
    // console.log(newMob);
    piece.mobility = Object.assign({}, newMob);

  } else if(piece instanceof Queen){
    // console.log("Queen!");
    let newMob = createEmptyBoard();
    // Moves/Captures in Forward Direction so up for White
    // Move/Capture : [up, (right (+), left (-))]
    let captures = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1]];
    // console.log(piece.location);
    captures.forEach(function (capture) {
      let newCap = isValidBoardPostion(capture, piece.location);
      while(newCap !== null){
        // console.log('\t' + newCap);
        newMob[newCap] = CAPTURE;
        newCap = isValidBoardPostion(capture, newCap);
      }
    });
    // console.log(newMob);
    piece.mobility = Object.assign({}, newMob);

  } else if(piece instanceof King){
    // console.log("King!");
    let newMob = createEmptyBoard();
    // Moves/Captures in Forward Direction so up for White
    // Move/Capture : [up, (right (+), left (-))]
    let captures = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1]];
    // console.log(piece.location);
    captures.forEach(function (capture) {
      let newCap = isValidBoardPostion(capture, piece.location);
      if(newCap !== null){
        // console.log('\t' + newCap);
        newMob[newCap] = CAPTURE;
      }
    });
    // console.log(newMob);
    piece.mobility = Object.assign({}, newMob);

  }
}

function locationToPos(location){
  let pos = {
    file: (location.charCodeAt(0) - 'a'.charCodeAt(0)) + 1,
    rank: parseInt(location.charAt(1)),
  };
  if(pos === null || !((typeof pos.file === "number") && Math.floor(pos.file) === pos.file) || !((typeof pos.rank === "number") && Math.floor(pos.rank) === pos.rank) ){
    console.log('locationToPos revieced an invalid location:');
    console.log("=============");
    console.log("**LOCATION**");
    console.log(location);
    console.log("=============");
    console.log("**POS**");
    console.log(pos);
    console.log("=============");
    return null;
  }
  return pos;
}

// Valid Position on Board
function isValidBoardPostion(move, location){
  let pos = locationToPos(location);
  if(pos === null){
    return null;
  }
  pos.rank += move[0];
  pos.file += move[1];
  if(pos.file > 8 || pos.file < 1 || pos.rank > 8 || pos.rank < 1){
    return null;
  }
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  // console.log(pos);
  return ""+files[pos.file - 1]+pos.rank;
}


function createEmptyBoard(){
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
  let tmpBoard = {};
  files.forEach(function(file){
    ranks.forEach(function (rank) {
      tmpBoard[file+rank] = null;
    });
  });
  return tmpBoard;
}


class Piece{
  constructor(color, location){
    this.color = color;
    this.location = location;
    updateMobility(this);
  }

  getAccess(target){
    console.log(target);
    console.log(this);
    return this.mobility[target];
  }

  move(target){
    this.location = target;
    updateMobility(this);
  }
}

class Pawn extends Piece{
  constructor(color, location, src){
    super(color, location);
    this.src = (color === 'b' ? bp : wp );
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

class GameEngine{

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


export {GameEngine};
