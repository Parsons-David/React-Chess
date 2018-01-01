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
class GameEngine{

  constructor(){

    // Board Pieces
    this.pieces = [
      [br, bb, bn, bk, bq, bn, bb, br],
      Array(8).fill(bp),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(wp),
      [wr, wb, wn, wk, wq, wn, wb, wr],
    ];
  }
}


export {GameEngine};
