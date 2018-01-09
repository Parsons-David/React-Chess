// IMG IMPORTS
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
// END IMG IMPORTS

// UTIL IMPORTS
import {
  MOVE,
  ATTACK,
  EN_PASSANT_SETUP,
  EN_PASSANT_CAPTURE,
  CAPTURE,
  createEmptyBoard,
  isValidBoardPostion,
} from './utils.js';
// END UTIL IMPORTS

class Piece{
  constructor(color, location){
    this.color = color;
    this.location = location;
    this.hasMoved = false;
    this.initialMoves = null;
  }

  getAccess(target){
    console.log(target);
    console.log(this);
    return this.mobility[target];
  }

  move(target){
    this.location = target;
    this.hasMoved = true;
  }
}

class Pawn extends Piece{
  constructor(color, location, src){
    super(color, location);
    this.src = (color === 'b' ? bp : wp );
    const dir = (color === 'b' ? -1 : 1 );
    this.moves = [
      {rank: dir * 1, file: -1, type: CAPTURE, unlimited: false},
      {rank: dir * 1, file: 1, type: CAPTURE, unlimited: false},
      {rank: dir * 1, file: 0, type: MOVE, unlimited: false}];
    this.initialMoves = [
      {rank: dir * 2, file: 0, type: EN_PASSANT_SETUP, unlimited: false}
    ];
    this.specialMoves = [
      {rank: dir * 1, file: 1, type: EN_PASSANT_CAPTURE, unlimited: false},
      {rank: dir * 1, file: -1, type: EN_PASSANT_CAPTURE, unlimited: false}
    ];
    this.enPasstable = false;
  }
  markEnPassantable(){
    this.enPasstable = true;
  }
  move(target){
    this.location = target;
    this.hasMoved = true;
    this.enPasstable = false;
  }
}

// TODO : Is dir required for anything beside PAWN?
class Rook extends Piece{
  constructor(color, location, src){
    super(color, location);
    this.src = (color === 'b' ? br : wr );
    const dir = (color === 'b' ? -1 : 1 );
    this.moves = [
      {rank: dir * 1, file: 0, type: ATTACK, unlimited: true},
      {rank: dir * -1, file: 0, type: ATTACK, unlimited: true},
      {rank: dir * 0, file: 1, type: ATTACK, unlimited: true},
      {rank: dir * 0, file: -1, type: ATTACK, unlimited: true}];
  }
}

class Bishop extends Piece{
  constructor(color, location, src){
    super(color, location);
    this.src = (color === 'b' ? bb : wb );
    const dir = (color === 'b' ? -1 : 1 );
    this.moves = [
      {rank: dir * 1, file: 1, type: ATTACK, unlimited: true},
      {rank: dir * -1, file: 1, type: ATTACK, unlimited: true},
      {rank: dir * 1, file: -1, type: ATTACK, unlimited: true},
      {rank: dir * -1, file: -1, type: ATTACK, unlimited: true}];
  }
}

class Knight extends Piece{
  constructor(color, location, src){
    super(color, location);
    this.src = (color === 'b' ? bn : wn );
    const dir = (color === 'b' ? -1 : 1 );
    this.moves = [
      {rank: dir * 2, file: -1, type: ATTACK, unlimited: false},
      {rank: dir * 2, file: 1, type: ATTACK, unlimited: false},
      {rank: dir * 1, file: 2, type: ATTACK, unlimited: false},
      {rank: dir * 1, file: -2, type: ATTACK, unlimited: false},
      {rank: dir * -2, file: -1, type: ATTACK, unlimited: false},
      {rank: dir * -2, file: 1, type: ATTACK, unlimited: false},
      {rank: dir * -1, file: 2, type: ATTACK, unlimited: false},
      {rank: dir * -1, file: -2, type: ATTACK, unlimited: false}];
  }

  // Special Cause the way it moves
  getMobility(){

  }
}

class Queen extends Piece{
  constructor(color, location, src){
    super(color, location);
    this.src = (color === 'b' ? bq : wq );
    const dir = (color === 'b' ? -1 : 1 );
    this.moves = [
      {rank: dir * 1, file: 0, type: ATTACK, unlimited: true},
      {rank: dir * -1, file: 0, type: ATTACK, unlimited: true},
      {rank: dir * 0, file: 1, type: ATTACK, unlimited: true},
      {rank: dir * 0, file: -1, type: ATTACK, unlimited: true},
      {rank: dir * 1, file: 1, type: ATTACK, unlimited: true},
      {rank: dir * -1, file: 1, type: ATTACK, unlimited: true},
      {rank: dir * 1, file: -1, type: ATTACK, unlimited: true},
      {rank: dir * -1, file: -1, type: ATTACK, unlimited: true}];
  }
}

class King extends Piece{
  constructor(color, location, src){
    super(color, location);
    this.src = (color === 'b' ? bk : wk );
    const dir = (color === 'b' ? -1 : 1 );
    this.moves = [
      {rank: dir * 1, file: 0, type: ATTACK, unlimited: false},
      {rank: dir * -1, file: 0, type: ATTACK, unlimited: false},
      {rank: dir * 0, file: 1, type: ATTACK, unlimited: false},
      {rank: dir * 0, file: -1, type: ATTACK, unlimited: false},
      {rank: dir * 1, file: 1, type: ATTACK, unlimited: false},
      {rank: dir * -1, file: 1, type: ATTACK, unlimited: false},
      {rank: dir * 1, file: -1, type: ATTACK, unlimited: false},
      {rank: dir * -1, file: -1, type: ATTACK, unlimited: false}];
  }

  // Special Cause Casstle
  getMobility(){

  }
}

export {
  Piece,
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King
};
