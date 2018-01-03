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
  initMobility,
  updateMobility
} from './utils.js';
// END UTIL IMPORTS

class Piece{
  constructor(color, location){
    this.color = color;
    this.location = location;
    initMobility(this);
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

export {
  Piece,
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King
};
