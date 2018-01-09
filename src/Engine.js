import {Board} from './Board.js'
import {King, Pawn, Rook} from './Pieces.js'
import {
  initMobility,
  updateMobility,
  CAPTURE,
  ATTACK,
  MOVE,
  EN_PASSANT_SETUP,
  CASTLE,
  EN_PASSANT_CAPTURE,
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
    } else if(access === CASTLE){
      const rank = (tmpPiece.color === 'b' ? '8' : '1')
      // Queen Side
      this.board.pieces[move.src] = null;
      this.board.pieces[move.dest] = tmpPiece;
      tmpPiece.move(move.dest);
      if(move.dest === 'c' + rank){
        this.board.pieces['a' + rank].move('a' + rank);
        this.board.pieces['d' + rank] = this.board.pieces['a' + rank];
        this.board.pieces['a' + rank] = null;
      } else { // King Side
        this.board.pieces['h' + rank].move('h' + rank);
        this.board.pieces['f' + rank] = this.board.pieces['h' + rank];
        this.board.pieces['h' + rank] = null;
      }
    } else if (access === EN_PASSANT_SETUP){
      this.board.pieces[move.src] = null;
      this.board.pieces[move.dest] = tmpPiece;
      tmpPiece.move(move.dest);
      tmpPiece.markEnPassantable();
    } else if (access === EN_PASSANT_CAPTURE){
      this.board.pieces[move.src] = null;
      this.board.pieces[move.dest] = tmpPiece;
      tmpPiece.move(move.dest);
      const behind = (tmpPiece.color === 'b' ? 1 : -1);
      // Left Side EP
      const captured = isValidBoardPostion([behind, 0], move.dest);
      this.board.pieces[captured] = null;
    } else {
      this.board.pieces[move.src] = null;
      this.board.pieces[move.dest] = tmpPiece;
      tmpPiece.move(move.dest);
    }
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
            if(move.type === ATTACK || move.type === MOVE) {
              mobility[newMob] = MOVE;
            }
          // Encountered Enemy Piece
          } else if(board.pieces[newMob].color !== piece.color) {
            // MUST BE ABLE TO ATTACK ENEMY IN ORDER TO CAPTURE IT
            if(move.type === ATTACK) {
              mobility[newMob] = CAPTURE;
            }
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
    // Unmoved Pawns and Kings have special Moves. (En Passant setup and Castling)
    if((!piece.hasMoved) && ((piece instanceof Pawn) || (piece instanceof King))){
      // console.log("Adding Special Mobility!");
      if(piece instanceof Pawn){
        // console.log("To a Pawn!");
        const dir = (piece.color === 'w' ? 1 : -1);
        const path = [1 * dir, 0];
        let pathMove = isValidBoardPostion(path, piece.location);
        if(pathMove !== null && mobility[pathMove] === MOVE){
          const eps = [2 * dir, 0];
          let newMove = isValidBoardPostion(eps, piece.location);
          if(newMove !== null ){
            // console.log('\t' + newMove);
            mobility[newMove] = EN_PASSANT_SETUP;
          }
        }
      } else if(piece instanceof King){
        // console.log("To a King!");
        const rank = (piece.color === 'w' ? '1' : '8');
        // Queen Side Castle
        // If Rook is still there are hasn't moved
        const qSide = board.pieces['a' + rank];
        if((qSide !== null) && (qSide instanceof Rook) && !(qSide.hasMoved)){
          // Make sure path is clear
          if(board.pieces['b' + rank] === null && board.pieces['c' + rank] === null && board.pieces['d' + rank] === null){
            mobility['c' + rank] = CASTLE;
          }
        }
        // King Side Castle
        // If Rook is still there are hasn't moved
        const kSide = board.pieces['h' + rank];
        if((kSide !== null) && (kSide instanceof Rook) && !(kSide.hasMoved)){
          // Make sure path is clear
          if(board.pieces['g' + rank] === null && board.pieces['f' + rank] === null){
            mobility['g' + rank] = CASTLE;
          }
        }
      }
    }
    if(piece instanceof Pawn){
      const dir = (piece.color === 'b' ? -1 : 1);
      // Left Side EP
      const left = isValidBoardPostion([0, -1], piece.location);
      if(left !== null && (board.pieces[left] instanceof Pawn) && board.pieces[left].enPasstable){
        const l_behind = isValidBoardPostion([dir, 0], left);
        if(l_behind !== null){
          mobility[l_behind] = EN_PASSANT_CAPTURE;
        }
      }
      // Right Side EP
      const right = isValidBoardPostion([0, 1], piece.location);
      if(right !== null && (board.pieces[right] instanceof Pawn) && board.pieces[right].enPasstable){
        const r_behind = isValidBoardPostion([dir, 0], right);
        if(r_behind !== null){
          mobility[r_behind] = EN_PASSANT_CAPTURE;
        }
      }
    }
    return mobility;
  }
}


export {Engine};
