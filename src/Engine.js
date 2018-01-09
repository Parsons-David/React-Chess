import {Board} from './Board.js'
import {
  initMobility,
  updateMobility,
  CAPTURE,
  createEmptyBoard,
  isValidBoardPostion,
} from './utils.js';

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
    let mobility = this.projectMoves(tmpPiece);
    console.log(mobility);
    const access = mobility[move.dest];
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

  // TODO : COLOR CONSTS
  projectMoves(piece){
    let mobility = createEmptyBoard();
    if(piece === null){
      return mobility;
    }
    const moves = piece.moves.slice();
    const baseLocation = piece.location;
    const board = this.board;
    moves.forEach(function(move){
        const moveDelta = [move.rank, move.file];
        let newMob = isValidBoardPostion(moveDelta, baseLocation);
        while(newMob !== null){
          // No Piece Encountered Yet
          if(board.pieces[newMob] === null){
            mobility[newMob] = move.type;
          // Encountered Enemy Piece
          } else if(board.pieces[newMob].color !== piece.color) {
            mobility[newMob] = move.type;
            break;
          // Encountered Friendly Piece
          } else {
            break;
          }
          // console.log('\t' + newCap);
          newMob = isValidBoardPostion(moveDelta, newMob);
          if(!move.unlimited){
            break;
          }
        }
    });
    return mobility;
  }

}


export {Engine};
