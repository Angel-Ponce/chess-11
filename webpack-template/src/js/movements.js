//Let's go! the validation movements for each piece!!
import * as is from "./onArrays";
import { piece } from "./piece";

export function towerValidationAhead(pos, wayUp, tiles) {
  let wayUpBool = is.onArray(wayUp, pos);
  //Si no esta en la barra inferior
  if (wayUpBool == false) {
    let count = 0;
    let ahead = pos + 8;
    count += seePieces(ahead, tiles);
    //Si adelante no hay pieza
    if (count == 0) {
      emptyToDot(ahead, wayUp, tiles, towerValidationAhead, "tower");
    }
  }
}

export function towerValidationBack(pos, wayDown, tiles) {
  let wayDownBool = is.onArray(wayDown, pos);
  //Si no esta en la barra inferior
  if (wayDownBool == false) {
    let count = 0;
    let back = pos - 8;
    count += seePieces(back, tiles);
    //Si adelante no hay pieza
    if (count == 0) {
      emptyToDot(back, wayDown, tiles, towerValidationBack, "tower");
    }
  }
}

export function towerValidationRight(pos, wayRight, tiles) {
  let wayRightBool = is.onArray(wayRight, pos);
  //Si no esta en la columna derecha
  if (wayRightBool == false) {
    let count = 0;
    let right = pos + 1;
    count += seePieces(right, tiles);
    //Si a la derecha no hay pieza
    if (count == 0) {
      emptyToDot(right, wayRight, tiles, towerValidationRight, "tower");
    }
  }
}

export function towerValidationLeft(pos, wayLeft, tiles) {
  let wayLeftBool = is.onArray(wayLeft, pos);
  //Si no esta en la columna izquierda
  if (wayLeftBool == false) {
    let count = 0;
    let left = pos - 1;
    count += seePieces(left, tiles);
    //Si a la izquierda no hay pieza
    if (count == 0) {
      emptyToDot(left, wayLeft, tiles, towerValidationLeft, "tower");
    }
  }
}

export function pawnValidation(piece, tiles, wayUp, wayDown) {
  let wayPawnBlack = [8, 9, 10, 11, 12, 13, 14, 15];
  let wayPawnWhite = [48, 49, 50, 51, 52, 53, 54, 55];
  let wayPawnBlackBool = is.onArray(wayPawnBlack, piece.pos);
  let wayPawnWhiteBool = is.onArray(wayPawnWhite, piece.pos);
  let wayNull = [];
  function funNull() {}

  //Peon negro en su posición inicial
  if (wayPawnBlackBool == true && piece.team == "black") {
    let posAhead1 = piece.pos + 8;
    let posAhead2 = piece.pos + 16;
    let ahead = seePieces(posAhead1, tiles);
    let ahead2 = seePieces(posAhead2, tiles);
    if (ahead == 0) {
      emptyToDot(posAhead1, wayNull, tiles, funNull, "pawn");
    }
    if (ahead2 == 0 && ahead == 0) {
      emptyToDot(posAhead2, wayNull, tiles, funNull, "pawn");
    }
  } else if (wayPawnBlackBool == false && piece.team == "black") {
    let wayUpBool = is.onArray(wayUp, piece.pos);
    //No esta en su límite
    if (wayUpBool == false) {
      let posAhead = piece.pos + 8;
      let ahead3 = seePieces(posAhead, tiles);
      if (ahead3 == 0) {
        emptyToDot(posAhead, wayNull, tiles, funNull, "pawn");
      }
    }
  }

  //Peon blanco en su posición inicial
  if (wayPawnWhiteBool == true && piece.team == "white") {
    let posBack1 = piece.pos - 8;
    let posBack2 = piece.pos - 16;
    let back1 = seePieces(posBack1, tiles);
    let back2 = seePieces(posBack2, tiles);

    if (back1 == 0) {
      emptyToDot(posBack1, wayNull, tiles, funNull, "pawn");
    }
    if (back2 == 0 && back1 == 0) {
      emptyToDot(posBack2, wayNull, tiles, funNull, "pawn");
    }
  } else if (wayPawnWhiteBool == false && piece.team == "white") {
    let wayDownBool = is.onArray(wayDown, piece.pos);
    //No esta en su límite
    if (wayDownBool == false) {
      let posBack = piece.pos - 8;
      let back3 = seePieces(posBack, tiles);
      if (back3 == 0) {
        emptyToDot(posBack, wayNull, tiles, funNull, "pawn");
      }
    }
  }
}

//External recursive function
export function emptyToDot(pos, wayArray, tiles, recursiveFunction, pieceName) {
  let dot = document.createElement("img");
  let pieceDot = new piece("dot", "dot", pos);
  dot.src = pieceDot.image;
  dot.id = "dot";
  tiles[pos].removeInnerElement();
  tiles[pos].innerElement = pieceDot;
  tiles[pos].tile.appendChild(dot);
  if (pieceName != "pawn") {
    recursiveFunction(pos, wayArray, tiles);
  }
}

export function removeDots(tiles) {
  for (let it of tiles) {
    if (it.innerElement.name == "dot") {
      it.toEmpty();
    }
  }
}

export function seePieces(pos, tiles) {
  if (tiles[pos].innerElement.name != "empty") {
    return 1;
  } else {
    return 0;
  }
}
