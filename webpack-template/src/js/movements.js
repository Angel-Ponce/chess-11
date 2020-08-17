//Let's go! the validation movements for each piece!!
import * as is from "./onArrays";
import { piece } from "./piece";
import { tile } from "./tile";

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
        // let dot = document.createElement("img");
        // let pieceDot = new piece('dot', 'dot', ahead);
        // dot.src = pieceDot.image;
        // dot.id = "dot";
        // tiles[ahead].innerElement = pieceDot;
        // tiles[ahead].removeInnerElement();
        // tiles[ahead].tile.appendChild(dot);
        // console.log(tiles[ahead].innerElement);
        // towerValidationAhead(ahead,wayUp,tiles);
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
        // let dot = document.createElement("img");
        // let pieceDot = new piece('dot', 'dot', back);
        // dot.src = pieceDot.image;
        // dot.id = "dot";
        // tiles[back].innerElement = pieceDot;
        // tiles[back].removeInnerElement();
        // tiles[back].tile.appendChild(dot);
        // console.log(tiles[back].innerElement);
        // towerValidationBack(back,wayDown,tiles);
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
    console.log(count);
    if(count == 0){
      emptyToDot(right,wayRight,tiles,towerValidationRight)
    }

  }
}

export function emptyToDot(pos,wayArray,tiles,recursiveFunction){
  console.log("yeah!");
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