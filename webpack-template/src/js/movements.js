//Let's go! the validation movements for each piece!!
import * as is from "./onArrays";
import { piece } from "./piece";

export function towerValidationAhead(pos, wayUp, tiles, staticPos) {
  let wayUpBool = is.onArray(wayUp, pos);
  //If not be at limit row
  if (wayUpBool == false) {
    let count = 0;
    let ahead = pos + 8;
    count += seePieces(ahead, tiles);
    //If ahead it is free
    if (count == 0) {
      emptyToDot(ahead, wayUp, tiles, towerValidationAhead, "tower", staticPos);
    } else {
      if (
        tiles[ahead].innerElement.team != tiles[staticPos].innerElement.team
      ) {
        tiles[ahead].tile.classList.add("vul");
        tiles[ahead].innerElement.vulnerate = true;
      }
    }
  }
}

export function towerValidationBack(pos, wayDown, tiles, staticPos) {
  let wayDownBool = is.onArray(wayDown, pos);
  //If not be at limit row
  if (wayDownBool == false) {
    let count = 0;
    let back = pos - 8;
    count += seePieces(back, tiles);
    //If back it is free
    if (count == 0) {
      emptyToDot(back, wayDown, tiles, towerValidationBack, "tower", staticPos);
    } else {
      if (tiles[back].innerElement.team != tiles[staticPos].innerElement.team) {
        tiles[back].tile.classList.add("vul");
        tiles[back].innerElement.vulnerate = true;
      }
    }
  }
}

export function towerValidationRight(pos, wayRight, tiles, staticPos) {
  let wayRightBool = is.onArray(wayRight, pos);
  //If not be at limit column
  if (wayRightBool == false) {
    let count = 0;
    let right = pos + 1;
    count += seePieces(right, tiles);
    //If right it is free
    if (count == 0) {
      emptyToDot(
        right,
        wayRight,
        tiles,
        towerValidationRight,
        "tower",
        staticPos
      );
    } else {
      if (
        tiles[right].innerElement.team != tiles[staticPos].innerElement.team
      ) {
        tiles[right].tile.classList.add("vul");
        tiles[right].innerElement.vulnerate = true;
      }
    }
  }
}

export function towerValidationLeft(pos, wayLeft, tiles, staticPos) {
  let wayLeftBool = is.onArray(wayLeft, pos);
  //If not be at limit column
  if (wayLeftBool == false) {
    let count = 0;
    let left = pos - 1;
    count += seePieces(left, tiles);
    //If left it is free
    if (count == 0) {
      emptyToDot(left, wayLeft, tiles, towerValidationLeft, "tower", staticPos);
    } else {
      if (tiles[left].innerElement.team != tiles[staticPos].innerElement.team) {
        tiles[left].tile.classList.add("vul");
        tiles[left].innerElement.vulnerate = true;
      }
    }
  }
}

export function pawnValidation(piece,tiles,wayUp,wayDown,wayLeft,wayRight,staticPos) {
  let wayPawnBlack = [8, 9, 10, 11, 12, 13, 14, 15];
  let wayPawnWhite = [48, 49, 50, 51, 52, 53, 54, 55];
  let wayPawnBlackBool = is.onArray(wayPawnBlack, piece.pos);
  let wayPawnWhiteBool = is.onArray(wayPawnWhite, piece.pos);
  let wayLeftBool = is.onArray(wayLeft, piece.pos);
  let wayRightBool = is.onArray(wayRight, piece.pos);
  let wayNull = [];
  function funNull() {}

  //black panw at initial position (2 dots)
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
    //If not bee at limit row
    if (wayUpBool == false) {
      let posAhead = piece.pos + 8;
      let ahead3 = seePieces(posAhead, tiles);
      if (ahead3 == 0) {
        emptyToDot(posAhead, wayNull, tiles, funNull, "pawn");
      }
      //View for food blacks
      if (wayLeftBool == true && piece.team == "black") {
        let corner = piece.pos + 9;
        let count = seePieces(corner, tiles);
        if (count == 1) {
          if (
            tiles[corner].innerElement.team !=
            tiles[staticPos].innerElement.team
          ) {
            tiles[corner].tile.classList.add("vul");
            tiles[corner].innerElement.vulnerate = true;
          }
        }
      } else if (wayRightBool == true && piece.team == "black") {
        let corner = piece.pos + 7;
        let count = seePieces(corner, tiles);
        if (count == 1) {
          if (
            tiles[corner].innerElement.team !=
            tiles[staticPos].innerElement.team
          ) {
            tiles[corner].tile.classList.add("vul");
            tiles[corner].innerElement.vulnerate = true;
          }
        }
      } else if (
        wayRightBool == false &&
        wayLeftBool == false &&
        piece.team == "black"
      ) {
        let corner1 = piece.pos + 9;
        let corner2 = piece.pos + 7;
        let count1 = seePieces(corner1, tiles);
        let count2 = seePieces(corner2, tiles);
        if (count1 == 1) {
          if (
            tiles[corner1].innerElement.team !=
            tiles[staticPos].innerElement.team
          ) {
            tiles[corner1].tile.classList.add("vul");
            tiles[corner1].innerElement.vulnerate = true;
          }
        }
        if (count2 == 1) {
          if (
            tiles[corner2].innerElement.team !=
            tiles[staticPos].innerElement.team
          ) {
            tiles[corner2].tile.classList.add("vul");
            tiles[corner2].innerElement.vulnerate = true;
          }
        }
      }
    }
  }

  //Pawn white at initial position (2 dots)
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
    //If not bee at limit row
    if (wayDownBool == false) {
      let posBack = piece.pos - 8;
      let back3 = seePieces(posBack, tiles);
      if (back3 == 0) {
        emptyToDot(posBack, wayNull, tiles, funNull, "pawn");
      }
      //View for food whites
      if (wayLeftBool == true && piece.team == "white") {
        let corner = piece.pos - 7;
        let count = seePieces(corner, tiles);
        if (count == 1) {
          if (
            tiles[corner].innerElement.team !=
            tiles[staticPos].innerElement.team
          ) {
            tiles[corner].tile.classList.add("vul");
            tiles[corner].innerElement.vulnerate = true;
          }
        }
      } else if (wayRightBool == true && piece.team == "white") {
        let corner = piece.pos - 9;
        let count = seePieces(corner, tiles);
        if (count == 1) {
          if (
            tiles[corner].innerElement.team !=
            tiles[staticPos].innerElement.team
          ) {
            tiles[corner].tile.classList.add("vul");
            tiles[corner].innerElement.vulnerate = true;
          }
        }
      } else if (
        wayRightBool == false &&
        wayLeftBool == false &&
        piece.team == "white"
      ) {
        let corner1 = piece.pos - 7;
        let corner2 = piece.pos - 9;
        let count1 = seePieces(corner1, tiles);
        let count2 = seePieces(corner2, tiles);
        if (count1 == 1) {
          if (
            tiles[corner1].innerElement.team !=
            tiles[staticPos].innerElement.team
          ) {
            tiles[corner1].tile.classList.add("vul");
            tiles[corner1].innerElement.vulnerate = true;
          }
        }
        if (count2 == 1) {
          if (
            tiles[corner2].innerElement.team !=
            tiles[staticPos].innerElement.team
          ) {
            tiles[corner2].tile.classList.add("vul");
            tiles[corner2].innerElement.vulnerate = true;
          }
        }
      }
    }
  }
}

export function horseValidation(pos, tiles, staticPos) {
  let funNull = function () {};
  let wayNull = [];
  let wayCenter = [18,19,20,21,26,27,28,29,34,35,36,37,42,43,44,45];
  let wayCenterBool = is.onArray(wayCenter, pos);
  let waySupRow = [1, 2, 3, 4, 5, 6];
  let waySupRowBool = is.onArray(waySupRow, pos);
  let wayInfRow = [57, 58, 59, 60, 61, 62];
  let wayInfRowBool = is.onArray(wayInfRow, pos);
  let wayLeftColumn = [8, 16, 24, 32, 40, 48];
  let wayLeftColumnBool = is.onArray(wayLeftColumn, pos);
  let wayRightColumn = [15, 23, 31, 39, 47, 55];
  let wayRightColumnBool = is.onArray(wayRightColumn, pos);
  let wayLeftColumn2 = [17, 25, 33, 41];
  let wayLeftColumn2Bool = is.onArray(wayLeftColumn2, pos);
  let wayRightColumn2 = [22, 30, 38, 46];
  let wayRightColumn2Bool = is.onArray(wayRightColumn2, pos);
  let waySupRow2 = [10, 11, 12, 13];
  let waySupRow2Bool = is.onArray(waySupRow2, pos);
  let wayInfRow2 = [50, 51, 52, 53];
  let wayInfRow2Bool = is.onArray(wayInfRow2, pos);
  let cornerSup1 = 0;
  let cornerSup2 = 7;
  let cornerSup3 = 9;
  let cornerSup4 = 14;
  let cornerInf1 = 56;
  let cornerInf2 = 63;
  let cornerInf3 = 49;
  let cornerInf4 = 54;

  //If the horse is at the center (free movements on board)
  if (wayCenterBool == true) {
    let posis = [pos - 17,pos - 15,pos - 10,pos - 6,pos + 10,pos + 6,pos + 17,pos + 15];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
  }
  //If the horse is at position 0
  if (cornerSup1 == pos) {
    let posis = [10, 17];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
  } //If the horse is at position 7
  else if (cornerSup2 == pos) {
    let posis = [13, 22];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
  } //If the horse is at position 56
  else if (cornerInf1 == pos) {
    let posis = [41, 50];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
  } //If the horse is at position 63
  else if (cornerInf2 == pos) {
    let posis = [46, 53];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
  }
  //If the horse is at up row
  if (waySupRowBool == true) {
    if (pos == 1) {
      let posis = [11, 16, 18];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
    } else if (pos == 6) {
      let posis = [12, 21, 23];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
    } else {
      let posis = [pos + 15, pos + 17, pos + 10, pos + 6];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
    }
  } //If the horse is at down row
  if (wayInfRowBool == true) {
    if (pos == 57) {
      let posis = [40, 42, 51];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
    } else if (pos == 61) {
      let posis = [45, 47, 52];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
    } else {
      let posis = [pos - 17, pos - 15, pos - 10, pos - 6];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
    }
  }
  //If the horse is at right column
  if (wayRightColumnBool == true) {
    if (pos == 15) {
      let posis = [5, 21, 30];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
    } else if (pos == 55) {
      let posis = [38, 45, 61];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
    } else {
      let posis = [pos - 17, pos - 10, pos + 6, pos + 15];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
    }
  } //If the horse is at left column
  if (wayLeftColumnBool == true) {
    if (pos == 8) {
      let posis = [2, 18, 25];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
    } else if (pos == 48) {
      let posis = [33, 42, 58];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
    } else {
      let posis = [pos - 15, pos - 6, pos + 10, pos + 17];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
    }
  }
  //If the horse is at position 9
  if (cornerSup3 == pos) {
    let posis = [3, 19, 24, 26];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
  } //If the horse is at position 14
  else if (cornerSup4 == pos) {
    let posis = [4, 20, 29, 31];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
  }
  //If the horse is at position 49
  if (cornerInf3 == pos) {
    let posis = [32, 34, 43, 59];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
  } //If the horse is at position 54
  else if (cornerInf4 == pos) {
    let posis = [37, 39, 44, 60];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
  }
  //If the horse is at second column left
  if (wayLeftColumn2Bool == true) {
    let posis = [pos - 17, pos - 15, pos - 6, pos + 10, pos + 17, pos + 15];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
  } //If the horse is at second column right
  else if (wayRightColumn2Bool == true) {
    let posis = [pos - 17, pos - 15, pos - 10, pos + 6, pos + 15, pos + 17];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
  } //If the horse is at second row sup
  else if (waySupRow2Bool == true) {
    let posis = [pos - 10, pos - 6, pos + 6, pos + 10, pos + 17, pos + 15];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
  } //If the horse is at second row inf
  else if (wayInfRow2Bool == true) {
    let posis = [pos + 6, pos + 10, pos - 10, pos - 6, pos - 17, pos - 15];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos);
  }
}

export function bishopValidationUL(pos, wayDown, wayLeft, tiles, staticPos) {
  let wayDownBool = is.onArray(wayDown, pos);
  let wayLeftBool = is.onArray(wayLeft, pos);
  if (wayDownBool == false && wayLeftBool == false) {
    let corner = pos - 9;
    let count1 = seePieces(corner, tiles);
    if (count1 == 0) {
      emptyToDotForBishops(corner,wayDown,wayLeft,tiles,bishopValidationUL,"bishop",staticPos);
    } else {
      if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
        tiles[corner].tile.classList.add("vul");
        tiles[corner].innerElement.vulnerate = true;
      }
    }
  }
}
export function bishopValidationUR(pos, wayDown, wayRight, tiles, staticPos) {
  let wayDownBool = is.onArray(wayDown, pos);
  let wayRightBool = is.onArray(wayRight, pos);
  if (wayDownBool == false && wayRightBool == false) {
    let corner = pos - 7;
    let count1 = seePieces(corner, tiles);
    if (count1 == 0) {
      emptyToDotForBishops(corner,wayDown,wayRight,tiles,bishopValidationUR,"bishop",staticPos);
    } else {
      if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
        tiles[corner].tile.classList.add("vul");
        tiles[corner].innerElement.vulnerate = true;
      }
    }
  }
}
export function bishopValidationDL(pos, wayUp, wayLeft, tiles, staticPos) {
  let wayUpBool = is.onArray(wayUp, pos);
  let wayLeftBool = is.onArray(wayLeft, pos);
  if (wayUpBool == false && wayLeftBool == false) {
    let corner = pos + 7;
    let count1 = seePieces(corner, tiles);
    if (count1 == 0) {
      emptyToDotForBishops(corner,wayUp,wayLeft,tiles,bishopValidationDL,"bishop",staticPos);
    }else {
      if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
        tiles[corner].tile.classList.add("vul");
        tiles[corner].innerElement.vulnerate = true;
      }
    }
  }
}
export function bishopValidationDR(pos, wayUp, wayRight, tiles, staticPos) {
  let wayUpBool = is.onArray(wayUp, pos);
  let wayRightBool = is.onArray(wayRight, pos);
  if (wayUpBool == false && wayRightBool == false) {
    let corner = pos + 9;
    let count1 = seePieces(corner, tiles);
    if (count1 == 0) {
      emptyToDotForBishops(corner,wayUp,wayRight,tiles,bishopValidationDR,"bishop",staticPos);
    }else {
      if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
        tiles[corner].tile.classList.add("vul");
        tiles[corner].innerElement.vulnerate = true;
      }
    }
  }
}

//External recursive function
export function emptyToDot(pos,wayArray,tiles,recursiveFunction,pieceName,staticPos) {
  let dot = document.createElement("img");
  let pieceDot = new piece("dot", "dot", pos);
  dot.src = pieceDot.image;
  dot.id = "dot";
  tiles[pos].removeInnerElement();
  tiles[pos].innerElement = pieceDot;
  tiles[pos].tile.appendChild(dot);
  if (pieceName != "pawn" && pieceName != "king") {
    recursiveFunction(pos, wayArray, tiles, staticPos);
  }
}
export function emptyToDotForBishops(pos,wayArray,wayArray2,tiles,recursiveFunction,pieceName,staticPos) {
  let dot = document.createElement("img");
  let pieceDot = new piece("dot", "dot", pos);
  dot.src = pieceDot.image;
  dot.id = "dot";
  tiles[pos].removeInnerElement();
  tiles[pos].innerElement = pieceDot;
  tiles[pos].tile.appendChild(dot);
  if (pieceName != "pawn") {
    recursiveFunction(pos, wayArray, wayArray2, tiles, staticPos);
  }
}

export function emptyToDotForHorses(posis, wayNull, tiles, funNull, staticPos) {
  for (let it of posis) {
    let num = seePieces(it, tiles);
    if (num == 0) {
      emptyToDot(it, wayNull, tiles, funNull, "pawn", staticPos);
    } else {
      if (tiles[it].innerElement.team != tiles[staticPos].innerElement.team) {
        tiles[it].tile.classList.add("vul");
        tiles[it].innerElement.vulnerate = true;
      }
    }
  }
}

export function removeDots(tiles) {
  for (let it of tiles) {
    if (it.innerElement.name == "dot") {
      it.toEmpty();
    }
  }
}
//View if in some position there a piece or not.
export function seePieces(pos, tiles) {
  if (tiles[pos].innerElement.name != "empty") {
    return 1;
  } else {
    return 0;
  }
}

export function removeVuls(tiles){
  for(let it of tiles){
    it.tile.classList.remove("vul");
  }
}

//The king use the same movements that the queen but, it would be not recursive.
//Validation of towers
export function kingValidationAhead(pos, wayUp, tiles, staticPos) {
  let funNull = function () {};
  let wayUpBool = is.onArray(wayUp, pos);
  //If not be at limit row
  if (wayUpBool == false) {
    let count = 0;
    let ahead = pos + 8;
    count += seePieces(ahead, tiles);
    //If ahead it is free
    if (count == 0) {
      emptyToDot(ahead, wayUp, tiles, funNull, "king");
    }else {
      if (tiles[ahead].innerElement.team != tiles[staticPos].innerElement.team) {
        tiles[ahead].tile.classList.add("vul");
        tiles[ahead].innerElement.vulnerate = true;
      }
    }
  }
}

export function kingValidationBack(pos, wayDown, tiles, staticPos) {
  let funNull = function () {};
  let wayDownBool = is.onArray(wayDown, pos);
  //If not be at limit row
  if (wayDownBool == false) {
    let count = 0;
    let back = pos - 8;
    count += seePieces(back, tiles);
    //If back it is free
    if (count == 0) {
      emptyToDot(back, wayDown, tiles, funNull, "king");
    }else {
      if (tiles[back].innerElement.team != tiles[staticPos].innerElement.team) {
        tiles[back].tile.classList.add("vul");
        tiles[back].innerElement.vulnerate = true;
      }
    }
  }
}

export function kingValidationRight(pos, wayRight, tiles, staticPos) {
  let funNull = function () {};
  let wayRightBool = is.onArray(wayRight, pos);
  //If not be at limit column
  if (wayRightBool == false) {
    let count = 0;
    let right = pos + 1;
    count += seePieces(right, tiles);
    //If right it is free
    if (count == 0) {
      emptyToDot(right, wayRight, tiles, funNull, "king");
    }else {
      if (tiles[right].innerElement.team != tiles[staticPos].innerElement.team) {
        tiles[right].tile.classList.add("vul");
        tiles[right].innerElement.vulnerate = true;
      }
    }
  }
}

export function kingValidationLeft(pos, wayLeft, tiles, staticPos) {
  let funNull = function () {};
  let wayLeftBool = is.onArray(wayLeft, pos);
  //If not be at limit column
  if (wayLeftBool == false) {
    let count = 0;
    let left = pos - 1;
    count += seePieces(left, tiles);
    //If left it is free
    if (count == 0) {
      emptyToDot(left, wayLeft, tiles, funNull, "king");
    }else {
      if (tiles[left].innerElement.team != tiles[staticPos].innerElement.team) {
        tiles[left].tile.classList.add("vul");
        tiles[left].innerElement.vulnerate = true;
      }
    }
  }
}
//Validation of bishop
export function kingValidationUL(pos, wayDown, wayLeft, tiles, staticPos) {
  let funNull = function () {};
  let wayDownBool = is.onArray(wayDown, pos);
  let wayLeftBool = is.onArray(wayLeft, pos);
  if (wayDownBool == false && wayLeftBool == false) {
    let corner = pos - 9;
    let count1 = seePieces(corner, tiles);
    if (count1 == 0) {
      emptyToDotForBishops(corner, wayDown, wayLeft, tiles, funNull, "king");
    }else {
      if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
        tiles[corner].tile.classList.add("vul");
        tiles[corner].innerElement.vulnerate = true;
      }
    }
  }
}
export function kingValidationUR(pos, wayDown, wayRight, tiles, staticPos) {
  let funNull = function () {};
  let wayDownBool = is.onArray(wayDown, pos);
  let wayRightBool = is.onArray(wayRight, pos);
  if (wayDownBool == false && wayRightBool == false) {
    let corner = pos - 7;
    let count1 = seePieces(corner, tiles);
    if (count1 == 0) {
      emptyToDotForBishops(corner, wayDown, wayRight, tiles, funNull, "king");
    }else {
      if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
        tiles[corner].tile.classList.add("vul");
        tiles[corner].innerElement.vulnerate = true;
      }
    }
  }
}
export function kingValidationDL(pos, wayUp, wayLeft, tiles, staticPos) {
  let funNull = function () {};
  let wayUpBool = is.onArray(wayUp, pos);
  let wayLeftBool = is.onArray(wayLeft, pos);
  if (wayUpBool == false && wayLeftBool == false) {
    let corner = pos + 7;
    let count1 = seePieces(corner, tiles);
    if (count1 == 0) {
      emptyToDotForBishops(corner, wayUp, wayLeft, tiles, funNull, "king");
    }else {
      if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
        tiles[corner].tile.classList.add("vul");
        tiles[corner].innerElement.vulnerate = true;
      }
    }
  }
}
export function kingValidationDR(pos, wayUp, wayRight, tiles, staticPos) {
  let funNull = function () {};
  let wayUpBool = is.onArray(wayUp, pos);
  let wayRightBool = is.onArray(wayRight, pos);
  if (wayUpBool == false && wayRightBool == false) {
    let corner = pos + 9;
    let count1 = seePieces(corner, tiles);
    if (count1 == 0) {
      emptyToDotForBishops(corner, wayUp, wayRight, tiles, funNull, "king");
    }else {
      if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
        tiles[corner].tile.classList.add("vul");
        tiles[corner].innerElement.vulnerate = true;
      }
    }
  }
}
