//Let's go! the validation movements for each piece!!
import * as is from "./onArrays";

export function towerValidationAhead(pos,wayUp,tiles){
    
    let wayUpBool = is.onArray(wayUp, pos);
    //Si no esta en la barra inferior
    if (wayUpBool == false) {
      let count = 0;
      let ahead = pos + 8;
      count += seePieces(ahead,tiles);
      console.log(count);
      //Si adelante no hay pieza
      if (count == 0) {
        let dot = document.createElement("img");
        let pieceDot = new piece('dot', 'dot', ahead);
        dot.src = pieceDot.image;
        tiles[ahead].innerElement = pieceDot;
        tiles[ahead].tile.appendChild(dot);
        console.log(tiles[ahead].innerElement);
        towerValidationAhead(ahead,wayUp,tiles);
      }
    }
}

export function towerValidationBack(pos,wayDown,tiles){
    
    let wayDownBool = is.onArray(wayDown, pos);
    //Si no esta en la barra inferior
    if (wayDownBool == false) {
      let count = 0;
      let back = pos - 8;
      count += seePieces(back,tiles);
      console.log(count);
      //Si adelante no hay pieza
      if (count == 0) {
        let dot = document.createElement("img");
        let pieceDot = new piece('dot', 'dot', back);
        dot.src = pieceDot.image;
        tiles[back].innerElement = pieceDot;
        tiles[back].tile.appendChild(dot);
        console.log(tiles[back].innerElement);
        towerValidationBack(back,wayDown,tiles);
      }
    }
}

export function seePieces(pos,tiles) {
    if (tiles[pos].innerElement.name != "empty") {
      return 1;
    } else {
      return 0;
    }
  }