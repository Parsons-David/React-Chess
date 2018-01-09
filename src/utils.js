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
const ATTACK = 'atak';
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
// END PIECES

export {
  CAPTURE,
  MOVE,
  ATTACK,
  EN_PASSANT_SETUP,
  CASTLE,
  EN_PASSANT_CAPTURE,
  createEmptyBoard,
  isValidBoardPostion,
}
