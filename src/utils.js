import {
  Piece,
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King
} from './Pieces.js';

// CONSTANTS
const MOVE = 'move';
const CAPTURE = 'cap';
const EN_PASSANT_SETUP = 'eps';
const EN_PASSANT_CAPTURE = 'epc';
const CASTLE = 'casl';


// FUNCTIONS

// BOARD
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
// END BOARD

// PIECES
function initMobility(piece){
  if(!(piece instanceof Piece)){
    console.log("updateMobility revieced a Object that wasn't a peice");
  }
  if(piece instanceof Pawn){
    updateMobility(piece);
    let dir = (piece.color === 'w' ? 1 : -1);
    let currMob = Object.assign({}, piece.mobility);
    // Moves/Captures in Forward Direction so up for White
    // Move/Capture : [up, (right (+), left (-))]
    let eps = [2 * dir, 0];
    let newMove = isValidBoardPostion(eps, piece.location);
    if(newMove !== null){
      // console.log('\t' + newMove);
      currMob[newMove] = EN_PASSANT_SETUP;
    }
    // console.log(newMob);
    piece.mobility = Object.assign({}, currMob);

  } else if(piece instanceof Rook){
    updateMobility(piece);
  } else if(piece instanceof Knight){
    updateMobility(piece);
  } else if(piece instanceof Bishop){
    updateMobility(piece);
  } else if(piece instanceof Queen){
    updateMobility(piece);
  } else if(piece instanceof King){
    updateMobility(piece);
    let currMob = Object.assign({}, piece.mobility);
    // Moves/Captures in Forward Direction so up for White
    // Move/Capture : [up, (right (+), left (-))]
    let castles = [
      [0, 2],
      [0, -2]];
    castles.forEach(function (castle) {
      let newMove = isValidBoardPostion(castle, piece.location);
      if(newMove !== null){
        // console.log('\t' + newMove);
        currMob[newMove] = CASTLE;
      }
    });
    piece.mobility = Object.assign({}, currMob);
  }
}

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
      [1 * dir, 0]]
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
// END PIECES

export {
  initMobility,
  updateMobility,
  MOVE,
  CAPTURE,
  EN_PASSANT_SETUP,
  EN_PASSANT_CAPTURE,
  CASTLE
}
