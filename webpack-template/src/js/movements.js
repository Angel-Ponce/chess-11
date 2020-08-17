//Let's go! the validation movements for each piece!!
import * as is from "./onArrays";
import { piece } from "./piece";

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
        emptyToDot(ahead,wayUp,tiles,towerValidationAhead);
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
        emptyToDot(back,wayDown,tiles,towerValidationBack);
      }
    }
}

export function towerValidationRight(pos,wayRight,tiles){

  let wayRightBool = is.onArray(wayRight,pos);
  //Si no esta en la columna derecha
  if(wayRightBool == false){
    let count = 0;
    let right = pos + 1;
    count += seePieces(right,tiles);
    //Si a la derecha no hay pieza
    console.log(count);
    if(count == 0){
      emptyToDot(right,wayRight,tiles,towerValidationRight)
    }

  }
}

export function towerValidationLeft(pos,wayLeft,tiles){
  let wayLeftBool = is.onArray(wayLeft,pos);
  //Si no esta en la columna izquierda
  if(wayLeftBool == false){
    let count = 0;
    let left = pos-1;
    count += seePieces(left,tiles);
    console.log(count);
    //Si a la izquierda no hay pieza
    if(count == 0){
      emptyToDot(left,wayLeft,tiles,towerValidationLeft);
    }

  }
}

//External recursive function
export function emptyToDot(pos,wayArray,tiles,recursiveFunction){
  let dot = document.createElement("img");
  let pieceDot = new piece('dot', 'dot', pos);
  dot.src = pieceDot.image;
  dot.id = "dot";
  tiles[pos].innerElement = pieceDot;
  tiles[pos].removeInnerElement();
  tiles[pos].tile.appendChild(dot);
  console.log(tiles[pos].innerElement);
  recursiveFunction(pos,wayArray,tiles);
}

export function seePieces(pos,tiles) {
    if (tiles[pos].innerElement.name != "empty") {
      return 1;
    } else {
      return 0;
    }
  }