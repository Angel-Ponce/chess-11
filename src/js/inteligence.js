//In this context the black pieces are inteligence pieces.
import * as is from "./onArrays";
import { piece } from "./piece";
//Chose the piece for movement
export function fakeClick(tiles,wayUp,wayDown,wayLeft,wayRight) {
  let posibilityClicks = [];
  let isValid = [];
  let selectionValid;
  let selectionRandom;
  let retorno = [];
  //The first selection is completly random
  for (let tile of tiles) {
    if (tile.innerElement.team == "black") {
      isValid = validate(tile.innerElement,tiles,wayUp,wayDown,wayLeft,wayRight);
      if(isValid.length > 0){
        posibilityClicks.push(tile.innerElement.pos);
      }
    }
  }
  selectionRandom = posibilityClicks[Math.floor(Math.random() * posibilityClicks.length)];
  let posis = secondClick(tiles[selectionRandom],tiles,wayUp,wayDown,wayLeft,wayRight);
  selectionValid = posis[Math.floor(Math.random() * posis.length)];
  retorno.push(selectionRandom);
  retorno.push(selectionValid);

  //The second selection is so smart, chose the piece will can eat in the board
    fr : for (let pos of posibilityClicks) {
      let smart = validate(tiles[pos].innerElement,tiles,wayUp,wayDown,wayLeft,wayRight);
      for(let posi of smart){
        if(tiles[posi].innerElement.team == "white"){
            retorno = [];
            selectionRandom = pos;
            selectionValid = posi;
            retorno.push(selectionRandom);
            retorno.push(selectionValid);
            break fr;
        }
      }
    }
  return retorno;
}
//Chose the second position for movement
export function secondClick(tile,tiles,wayUp,wayDown,wayLeft,wayRight){
    let isValid = validate(tile.innerElement,tiles,wayUp,wayDown,wayLeft,wayRight);
    return isValid;
}
/*--------------------------------------------------------------------------------------------*/
export function towerValidationAhead(pos, wayUp, tiles, staticPos, posibilitys) {
  let wayUpBool = is.onArray(wayUp, pos);
  //If not be at limit row
  if (wayUpBool == false) {
    let count = 0;
    let ahead = pos + 8;
    count += seePieces(ahead, tiles);
    //If ahead it is free
    if (count == 0) {
      posibilitys.push(ahead);
      emptyToDot(ahead,wayUp,tiles,towerValidationAhead,'tower',staticPos,posibilitys);
    } else {
        if(tiles[ahead].innerElement.team != tiles[staticPos].innerElement.team){
            posibilitys.push(ahead);
        }
    }
  }
  return posibilitys;
}

export function towerValidationBack(pos, wayDown, tiles, staticPos,posibilitys) {
  let wayDownBool = is.onArray(wayDown, pos);
  //If not be at limit row
  if (wayDownBool == false) {
    let count = 0;
    let back = pos - 8;
    count += seePieces(back, tiles);
    //If back it is free
    if (count == 0) {
        posibilitys.push(back);
        emptyToDot(back, wayDown, tiles, towerValidationBack, "tower", staticPos,posibilitys);
    } else {
        if(tiles[back].innerElement.team != tiles[staticPos].innerElement.team){
            posibilitys.push(back);
        }
    }
  }
  return posibilitys;
}

export function towerValidationRight(pos, wayRight, tiles, staticPos,posibilitys) {
  let wayRightBool = is.onArray(wayRight, pos);
  //If not be at limit column
  if (wayRightBool == false) {
    let count = 0;
    let right = pos + 1;
    count += seePieces(right, tiles);
    //If right it is free
    if (count == 0) {
        posibilitys.push(right);
        emptyToDot(right,wayRight,tiles,towerValidationRight,"tower",staticPos,posibilitys);
    } else {
        if(tiles[right].innerElement.team != tiles[staticPos].innerElement.team){
            posibilitys.push(right);
        }
    }
  }
  return posibilitys;
}

export function towerValidationLeft(pos, wayLeft, tiles, staticPos,posibilitys) {
  let wayLeftBool = is.onArray(wayLeft, pos);
  //If not be at limit column
  if (wayLeftBool == false) {
    let count = 0;
    let left = pos - 1;
    count += seePieces(left, tiles);
    //If left it is free
    if (count == 0) {
        posibilitys.push(left);
        emptyToDot(left, wayLeft, tiles, towerValidationLeft, "tower", staticPos,posibilitys);
    } else {
        if(tiles[left].innerElement.team != tiles[staticPos].innerElement.team){
            posibilitys.push(left);
        }
    }
  }
  return posibilitys;
}

export function pawnValidation(piece,tiles,wayUp,wayDown,wayLeft,wayRight,staticPos) {
    let posibilitys = [];
  let wayPawnBlack = [8, 9, 10, 11, 12, 13, 14, 15];
  let wayPawnWhite = [48, 49, 50, 51, 52, 53, 54, 55];
  let wayPawnBlackBool = is.onArray(wayPawnBlack, piece.pos);
  let wayPawnWhiteBool = is.onArray(wayPawnWhite, piece.pos);
  let wayLeftBool = is.onArray(wayLeft, piece.pos);
  let wayRightBool = is.onArray(wayRight, piece.pos);
  let wayUpBool = is.onArray(wayUp,piece.pos);
  let wayDownBool = is.onArray(wayDown,piece.pos);
  let wayNull = [];
  function funNull() {}

  //black panw at initial position (2 dots)
  if (wayPawnBlackBool == true && piece.team == "black") {
    let posAhead1 = piece.pos + 8;
    let posAhead2 = piece.pos + 16;
    let ahead = seePieces(posAhead1, tiles);
    let ahead2 = seePieces(posAhead2, tiles);
    if (ahead == 0) {
        posibilitys.push(posAhead1);
        emptyToDot(posAhead1, wayNull, tiles, funNull, "pawn");
    }
    if (ahead2 == 0 && ahead == 0) {
      posibilitys.push(posAhead2);
      emptyToDot(posAhead2, wayNull, tiles, funNull, "pawn");
    }
  } else if (wayPawnBlackBool == false && piece.team == "black") {
    let wayUpBool = is.onArray(wayUp, piece.pos);
    //If not bee at limit row
    if (wayUpBool == false) {
      let posAhead = piece.pos + 8;
      let ahead3 = seePieces(posAhead, tiles);
      if (ahead3 == 0) {
        posibilitys.push(posAhead);
        emptyToDot(posAhead, wayNull, tiles, funNull, "pawn");
      }
    }
  }

  if(wayUpBool == false){
    //View for food blacks
    if (wayLeftBool == true && piece.team == "black") {
      let corner = piece.pos + 9;
      let count = seePieces(corner, tiles);
      if (count == 1) {
        if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
            posibilitys.push(corner);
          }
      }
    } else if (wayRightBool == true && piece.team == "black") {
      let corner = piece.pos + 7;
      let count = seePieces(corner, tiles);
      if (count == 1) {
        if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
            posibilitys.push(corner);
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
        if (tiles[corner1].innerElement.team != tiles[staticPos].innerElement.team) {
            posibilitys.push(corner1);
          }
      }
      if (count2 == 1) {
        if (tiles[corner2].innerElement.team != tiles[staticPos].innerElement.team) {
            posibilitys.push(corner2);
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
        posibilitys.push(posBack1);
        emptyToDot(posBack1, wayNull, tiles, funNull, "pawn");
    }
    if (back2 == 0 && back1 == 0) {
        posibilitys.push(posBack2);
        emptyToDot(posBack2, wayNull, tiles, funNull, "pawn");
    }
  } else if (wayPawnWhiteBool == false && piece.team == "white") {
    let wayDownBool = is.onArray(wayDown, piece.pos);
    //If not bee at limit row
    if (wayDownBool == false) {
      let posBack = piece.pos - 8;
      let back3 = seePieces(posBack, tiles);
      if (back3 == 0) {
        posibilitys.push(posBack);
        emptyToDot(posBack, wayNull, tiles, funNull, "pawn");
      }
    }
  }
  if(wayDownBool == false){
    //View for food whites
    if (wayLeftBool == true && piece.team == "white") {
      let corner = piece.pos - 7;
      let count = seePieces(corner, tiles);
      if (count == 1) {
        if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
            posibilitys.push(corner);
          }
      }
    } else if (wayRightBool == true && piece.team == "white") {
      let corner = piece.pos - 9;
      let count = seePieces(corner, tiles);
      if (count == 1) {
        if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
            posibilitys.push(corner);
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
        if (tiles[corner1].innerElement.team != tiles[staticPos].innerElement.team) {
            posibilitys.push(corner1);
          }
      }
      if (count2 == 1) {
        if (tiles[corner2].innerElement.team != tiles[staticPos].innerElement.team) {
            posibilitys.push(corner2);
          }
      }
    }
  }
  return posibilitys;
}

export function horseValidation(pos, tiles, staticPos) {
    let posibilitys = [];
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
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
  }
  //If the horse is at position 0
  if (cornerSup1 == pos) {
    let posis = [10, 17];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
  } //If the horse is at position 7
  else if (cornerSup2 == pos) {
    let posis = [13, 22];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
  } //If the horse is at position 56
  else if (cornerInf1 == pos) {
    let posis = [41, 50];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
  } //If the horse is at position 63
  else if (cornerInf2 == pos) {
    let posis = [46, 53];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
  }
  //If the horse is at up row
  if (waySupRowBool == true) {
    if (pos == 1) {
      let posis = [11, 16, 18];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
    } else if (pos == 6) {
      let posis = [12, 21, 23];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
    } else {
      let posis = [pos + 15, pos + 17, pos + 10, pos + 6];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
    }
  } //If the horse is at down row
  if (wayInfRowBool == true) {
    if (pos == 57) {
      let posis = [40, 42, 51];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
    } else if (pos == 61) {
      let posis = [45, 47, 52];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
    } else {
      let posis = [pos - 17, pos - 15, pos - 10, pos - 6];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
    }
  }
  //If the horse is at right column
  if (wayRightColumnBool == true) {
    if (pos == 15) {
      let posis = [5, 21, 30];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
    } else if (pos == 55) {
      let posis = [38, 45, 61];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
    } else {
      let posis = [pos - 17, pos - 10, pos + 6, pos + 15];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
    }
  } //If the horse is at left column
  if (wayLeftColumnBool == true) {
    if (pos == 8) {
      let posis = [2, 18, 25];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
    } else if (pos == 48) {
      let posis = [33, 42, 58];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
    } else {
      let posis = [pos - 15, pos - 6, pos + 10, pos + 17];
      emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
    }
  }
  //If the horse is at position 9
  if (cornerSup3 == pos) {
    let posis = [3, 19, 24, 26];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
  } //If the horse is at position 14
  else if (cornerSup4 == pos) {
    let posis = [4, 20, 29, 31];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
  }
  //If the horse is at position 49
  if (cornerInf3 == pos) {
    let posis = [32, 34, 43, 59];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
  } //If the horse is at position 54
  else if (cornerInf4 == pos) {
    let posis = [37, 39, 44, 60];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
  }
  //If the horse is at second column left
  if (wayLeftColumn2Bool == true) {
    let posis = [pos - 17, pos - 15, pos - 6, pos + 10, pos + 17, pos + 15];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
  } //If the horse is at second column right
  else if (wayRightColumn2Bool == true) {
    let posis = [pos - 17, pos - 15, pos - 10, pos + 6, pos + 15, pos + 17];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
  } //If the horse is at second row sup
  else if (waySupRow2Bool == true) {
    let posis = [pos - 10, pos - 6, pos + 6, pos + 10, pos + 17, pos + 15];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
  } //If the horse is at second row inf
  else if (wayInfRow2Bool == true) {
    let posis = [pos + 6, pos + 10, pos - 10, pos - 6, pos - 17, pos - 15];
    emptyToDotForHorses(posis, wayNull, tiles, funNull,staticPos, posibilitys);
  }
  return posibilitys;
}

export function bishopValidationUL(pos, wayDown, wayLeft, tiles, staticPos,posibilitys) {
  let wayDownBool = is.onArray(wayDown, pos);
  let wayLeftBool = is.onArray(wayLeft, pos);
  if (wayDownBool == false && wayLeftBool == false) {
    let corner = pos - 9;
    let count1 = seePieces(corner, tiles);
    if (count1 == 0) {
        posibilitys.push(corner);
        emptyToDotForBishops(corner,wayDown,wayLeft,tiles,bishopValidationUL,"bishop",staticPos,posibilitys);
    } else {
        if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
           posibilitys.push(corner);
          }
    }
  }
  return posibilitys;
}
export function bishopValidationUR(pos, wayDown, wayRight, tiles, staticPos,posibilitys) {
  let wayDownBool = is.onArray(wayDown, pos);
  let wayRightBool = is.onArray(wayRight, pos);
  if (wayDownBool == false && wayRightBool == false) {
    let corner = pos - 7;
    let count1 = seePieces(corner, tiles);
    if (count1 == 0) {
        posibilitys.push(corner);
        emptyToDotForBishops(corner,wayDown,wayRight,tiles,bishopValidationUR,"bishop",staticPos,posibilitys);
    } else {
        if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
           posibilitys.push(corner);
          }
    }
  }
  return posibilitys;
}
export function bishopValidationDL(pos, wayUp, wayLeft, tiles, staticPos,posibilitys) {
  let wayUpBool = is.onArray(wayUp, pos);
  let wayLeftBool = is.onArray(wayLeft, pos);
  if (wayUpBool == false && wayLeftBool == false) {
    let corner = pos + 7;
    let count1 = seePieces(corner, tiles);
    if (count1 == 0) {
        posibilitys.push(corner);
        emptyToDotForBishops(corner,wayUp,wayLeft,tiles,bishopValidationDL,"bishop",staticPos,posibilitys);
    } else {
        if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
           posibilitys.push(corner);
          }
    }
  }
  return posibilitys;
}
export function bishopValidationDR(pos, wayUp, wayRight, tiles, staticPos,posibilitys) {
  let wayUpBool = is.onArray(wayUp, pos);
  let wayRightBool = is.onArray(wayRight, pos);
  if (wayUpBool == false && wayRightBool == false) {
    let corner = pos + 9;
    let count1 = seePieces(corner, tiles);
    if (count1 == 0) {
        posibilitys.push(corner);
        emptyToDotForBishops(corner,wayUp,wayRight,tiles,bishopValidationDR,"bishop",staticPos,posibilitys);
    } else {
        if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
           posibilitys.push(corner);
          }
    }
  }
  return posibilitys;
}

//External recursive function
export function emptyToDot(pos,wayArray,tiles,recursiveFunction,pieceName,staticPos,posibilitys) {
    if (pieceName != "pawn" && pieceName != "king") {
      recursiveFunction(pos, wayArray, tiles, staticPos,posibilitys);
    }
}
export function emptyToDotForBishops(pos,wayArray,wayArray2,tiles,recursiveFunction,pieceName,staticPos,posibilitys) {
    if (pieceName != "pawn" && pieceName != "king") {
      recursiveFunction(pos, wayArray, wayArray2, tiles, staticPos,posibilitys);
    }
}

export function emptyToDotForHorses(posis, wayNull, tiles, funNull, staticPos,posibilitys) {
  for (let it of posis) {
    let num = seePieces(it, tiles);
    if (num == 0) {
        posibilitys.push(it);
    } else {
        if (tiles[it].innerElement.team != tiles[staticPos].innerElement.team) {
           posibilitys.push(it);
          }
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

//The king use the same movements that the queen but, it would be not recursive.
//Validation of towers
export function kingValidationAhead(pos, wayUp, tiles, staticPos,posibilitys) {
  let funNull = function () {};
  let wayUpBool = is.onArray(wayUp, pos);
  //If not be at limit row
  if (wayUpBool == false) {
    let count = 0;
    let ahead = pos + 8;
    count += seePieces(ahead, tiles);
    //If ahead it is free
    if (count == 0) {
        posibilitys.push(ahead);
        emptyToDot(ahead, wayUp, tiles, funNull, "king",staticPos,posibilitys);
      }else {
        if (tiles[ahead].innerElement.team != tiles[staticPos].innerElement.team) {
          posibilitys.push(ahead);
        }
      }
  }
  return posibilitys;
}

export function kingValidationBack(pos, wayDown, tiles, staticPos,posibilitys) {
  let funNull = function () {};
  let wayDownBool = is.onArray(wayDown, pos);
  //If not be at limit row
  if (wayDownBool == false) {
    let count = 0;
    let back = pos - 8;
    count += seePieces(back, tiles);
    //If back it is free
    if (count == 0) {
        posibilitys.push(back);
        emptyToDot(back, wayDown, tiles, funNull, "king",staticPos,posibilitys);
      }else {
        if (tiles[back].innerElement.team != tiles[staticPos].innerElement.team) {
          posibilitys.push(back);
        }
      }
  }
  return posibilitys;
}

export function kingValidationRight(pos, wayRight, tiles, staticPos,posibilitys) {
  let funNull = function () {};
  let wayRightBool = is.onArray(wayRight, pos);
  //If not be at limit column
  if (wayRightBool == false) {
    let count = 0;
    let right = pos + 1;
    count += seePieces(right, tiles);
    //If right it is free
    if (count == 0) {
        posibilitys.push(right);
        emptyToDot(right, wayRight, tiles, funNull, "king",staticPos,posibilitys);
      }else {
        if (tiles[right].innerElement.team != tiles[staticPos].innerElement.team) {
            posibilitys.push(right);
        }
      }
  }
  return posibilitys;
}

export function kingValidationLeft(pos, wayLeft, tiles, staticPos,posibilitys) {
  let funNull = function () {};
  let wayLeftBool = is.onArray(wayLeft, pos);
  //If not be at limit column
  if (wayLeftBool == false) {
    let count = 0;
    let left = pos - 1;
    count += seePieces(left, tiles);
    //If left it is free
    if (count == 0) {
        posibilitys.push(left);
        emptyToDot(left, wayLeft, tiles, funNull, "king",staticPos,posibilitys);
      }else {
        if (tiles[left].innerElement.team != tiles[staticPos].innerElement.team) {
          posibilitys.push(left);
        }
      }
  }
  return posibilitys;
}
//Validation of bishop
export function kingValidationUL(pos, wayDown, wayLeft, tiles, staticPos,posibilitys) {
  let funNull = function () {};
  let wayDownBool = is.onArray(wayDown, pos);
  let wayLeftBool = is.onArray(wayLeft, pos);
  if (wayDownBool == false && wayLeftBool == false) {
    let corner = pos - 9;
    let count1 = seePieces(corner, tiles);
    if (count1 == 0) {
        posibilitys.push(corner);
        emptyToDotForBishops(corner, wayDown, wayLeft, tiles, funNull, "king",staticPos,posibilitys);
      }else {
        if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
          posibilitys.push(corner);
        }
      }
  }
  return posibilitys;
}
export function kingValidationUR(pos, wayDown, wayRight, tiles, staticPos,posibilitys) {
  let funNull = function () {};
  let wayDownBool = is.onArray(wayDown, pos);
  let wayRightBool = is.onArray(wayRight, pos);
  if (wayDownBool == false && wayRightBool == false) {
    let corner = pos - 7;
    let count1 = seePieces(corner, tiles);
    if (count1 == 0) {
        posibilitys.push(corner);
        emptyToDotForBishops(corner, wayDown, wayRight, tiles, funNull, "king",staticPos,posibilitys);
      }else {
        if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
          posibilitys.push(corner);
        }
      }
  }
  return posibilitys;
}
export function kingValidationDL(pos, wayUp, wayLeft, tiles, staticPos,posibilitys) {
  let funNull = function () {};
  let wayUpBool = is.onArray(wayUp, pos);
  let wayLeftBool = is.onArray(wayLeft, pos);
  if (wayUpBool == false && wayLeftBool == false) {
    let corner = pos + 7;
    let count1 = seePieces(corner, tiles);
    if (count1 == 0) {
        posibilitys.push(corner);
        emptyToDotForBishops(corner, wayUp, wayLeft, tiles, funNull, "king",staticPos,posibilitys);
      }else {
        if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
          posibilitys.push(corner);
        }
      }
  }
  return posibilitys;
}
export function kingValidationDR(pos, wayUp, wayRight, tiles, staticPos,posibilitys) {
  let funNull = function () {};
  let wayUpBool = is.onArray(wayUp, pos);
  let wayRightBool = is.onArray(wayRight, pos);
  if (wayUpBool == false && wayRightBool == false) {
    let corner = pos + 9;
    let count1 = seePieces(corner, tiles);
    if (count1 == 0) {
        posibilitys.push(corner);
        emptyToDotForBishops(corner, wayUp, wayRight, tiles, funNull, "king",staticPos,posibilitys);
      }else {
        if (tiles[corner].innerElement.team != tiles[staticPos].innerElement.team) {
          posibilitys.push(corner);
        }
      }
  }
  return posibilitys;
}

export function validate(piece,tiles,wayUp,wayDown,wayLeft,wayRight){
    let posibilitys = [];
    let none = [];
    if (piece.name == "tower") {
      posibilitys = towerValidationAhead(piece.pos, wayUp, tiles,piece.pos,none);
      posibilitys = towerValidationBack(piece.pos, wayDown, tiles,piece.pos,none);
      posibilitys = towerValidationRight(piece.pos, wayRight, tiles,piece.pos,none);
      posibilitys = towerValidationLeft(piece.pos, wayLeft, tiles,piece.pos,none);
    } else if (piece.name == "pawn") {
      //This is an algorithm not recursive, because it would convenient work that.
      posibilitys = pawnValidation(piece, tiles, wayUp, wayDown,wayLeft,wayRight,piece.pos);
    } else if (piece.name == "horse") {
      //This is an algorithm not recursive, because it would convenient work that.
      posibilitys = horseValidation(piece.pos, tiles,piece.pos);
    } else if(piece.name == "bishop"){
      posibilitys = bishopValidationUL(piece.pos,wayDown,wayLeft,tiles,piece.pos,none);
      posibilitys = bishopValidationUR(piece.pos,wayDown,wayRight,tiles,piece.pos,none);
      posibilitys = bishopValidationDL(piece.pos,wayUp,wayLeft,tiles,piece.pos,none);
      posibilitys = bishopValidationDR(piece.pos,wayUp,wayRight,tiles,piece.pos,none);
    } else if(piece.name == "queen"){
      //The queen use the same movements at tower and bishop
      posibilitys = towerValidationAhead(piece.pos, wayUp, tiles,piece.pos,none);
      posibilitys = towerValidationBack(piece.pos, wayDown, tiles,piece.pos,none);
      posibilitys = towerValidationRight(piece.pos, wayRight, tiles,piece.pos,none);
      posibilitys = towerValidationLeft(piece.pos, wayLeft, tiles,piece.pos,none);
      posibilitys = bishopValidationUL(piece.pos,wayDown,wayLeft,tiles,piece.pos,none);
      posibilitys = bishopValidationUR(piece.pos,wayDown,wayRight,tiles,piece.pos,none);
      posibilitys = bishopValidationDL(piece.pos,wayUp,wayLeft,tiles,piece.pos,none);
      posibilitys = bishopValidationDR(piece.pos,wayUp,wayRight,tiles,piece.pos,none);
    } else if(piece.name == "king"){
      posibilitys = kingValidationAhead(piece.pos,wayUp,tiles,piece.pos,none);
      posibilitys = kingValidationBack(piece.pos,wayDown,tiles,piece.pos,none);
      posibilitys = kingValidationRight(piece.pos,wayRight,tiles,piece.pos,none);
      posibilitys = kingValidationLeft(piece.pos,wayLeft,tiles,piece.pos,none);
      posibilitys = kingValidationUL(piece.pos,wayDown,wayLeft,tiles,piece.pos,none);
      posibilitys = kingValidationUR(piece.pos,wayDown,wayRight,tiles,piece.pos,none);
      posibilitys = kingValidationDL(piece.pos,wayUp,wayLeft,tiles,piece.pos,none);
      posibilitys = kingValidationDR(piece.pos,wayUp,wayRight,tiles,piece.pos,none);
    }
    return posibilitys;
}

