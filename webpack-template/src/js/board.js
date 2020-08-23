import { piece } from "./piece";
import { tile } from "./tile";
import * as use from "./movements";

export class board {
  constructor(size) {
    this.size = size;
    this.main = document.querySelector(".main");
    this.deathBlack = document.querySelector("#blacks");
    this.deathWhite = document.querySelector("#whites");
    this.reset = document.querySelector(".butomReset");
    this.tiles = [];
    this.tilesDB = [];
    this.tilesDW = [];
    this.wayDown = [0, 1, 2, 3, 4, 5, 6, 7];
    this.wayUp = [56, 57, 58, 59, 60, 61, 62, 63];
    this.wayLeft = [0, 8, 16, 24, 32, 40, 48, 56];
    this.wayRight = [7, 15, 23, 31, 39, 47, 55, 63];
    this.click = 0;
    this.myCounter = 0;
    this.pInicial;
    this.pFinal;
  }

  createSpaceOfDeahts(tilesName,deathName){
    let altern = true;
    for(let i=1; i<=16; i++){
      let pieceN = new piece("empty","empty", i-1);
      let tileObj = new tile(i-1,pieceN);
      let empty = document.createElement("img");
      empty.src = pieceN.image;
      tileObj.tile.appendChild(empty);
      if(altern){
        tileObj.tile.classList.add("death0");
        altern = false;
      }else{
        tileObj.tile.classList.add("death1");
        altern = true;
      }

      if(i%2 == 0){
        if(altern){
          altern = false;
        }else{
          altern = true;
        }
      }
    tilesName.push(tileObj);
    deathName.appendChild(tileObj.tile);
    }
  }

  createBoard() {
    let altern = true;
    for (let i = 1; i <= this.size; i++) {
      let pieceN = new piece("empty", "empty", i - 1);
      let tileObj = new tile(i - 1, pieceN);
      if (altern) {
        tileObj.tile.classList.add("tile0");
        altern = false;
      } else {
        tileObj.tile.classList.add("tile1");
        altern = true;
      }
      if (i % 8 == 0) {
        if (altern) {
          altern = false;
        } else {
          altern = true;
        }
      }

      this.tiles.push(tileObj);
      this.main.appendChild(tileObj.tile);
    }
    this.buildTeams();
    this.createSpaceOfDeahts(this.tilesDB,this.deathBlack);
    this.createSpaceOfDeahts(this.tilesDW,this.deathWhite);
  }

  buildTeams() {
    //Blacks
    let Btower1 = new piece("tower", "black", 0);
    this.tiles[0].innerElement = Btower1;

    let Btower2 = new piece("tower", "black", 7);
    this.tiles[7].innerElement = Btower2;

    let Bhorse1 = new piece("horse", "black", 1);
    this.tiles[1].innerElement = Bhorse1;

    let Bhorse2 = new piece("horse", "black", 6);
    this.tiles[6].innerElement = Bhorse2;

    let Bbishop1 = new piece("bishop", "black", 2);
    this.tiles[2].innerElement = Bbishop1;

    let Bbishop2 = new piece("bishop", "black", 5);
    this.tiles[5].innerElement = Bbishop2;

    let Bking = new piece("king", "black", 3);
    this.tiles[3].innerElement = Bking;

    let Bqueen = new piece("queen", "black", 4);
    this.tiles[4].innerElement = Bqueen;

    for (let i = 8; i <= 15; i++) {
      let Bpawn = new piece("pawn", "black", i);
      this.tiles[i].innerElement = Bpawn;
    }

    //Whites
    let Wtower1 = new piece("tower", "white", 56);
    this.tiles[56].innerElement = Wtower1;

    let Wtower2 = new piece("tower", "white", 63);
    this.tiles[63].innerElement = Wtower2;

    let Whorse1 = new piece("horse", "white", 57);
    this.tiles[57].innerElement = Whorse1;

    let Whorse2 = new piece("horse", "white", 62);
    this.tiles[62].innerElement = Whorse2;

    let Wbishop1 = new piece("bishop", "white", 58);
    this.tiles[58].innerElement = Wbishop1;

    let Wbishop2 = new piece("bishop", "white", 61);
    this.tiles[61].innerElement = Wbishop2;

    let Wking = new piece("king", "white", 60);
    this.tiles[60].innerElement = Wking;

    let Wqueen = new piece("queen", "white", 59);
    this.tiles[59].innerElement = Wqueen;

    for (let i = 48; i < 56; i++) {
      let Wpawn = new piece("pawn", "white", i);
      this.tiles[i].innerElement = Wpawn;
    }

    this.initialPositions();
  }

  initialPositions() {
    for (let i = 0; i < 64; i++) {
      let empty = document.createElement("img");
      empty.src = this.tiles[i].innerElement.image;
      this.tiles[i].tile.appendChild(empty);
    }
    this.eventClick();
  }

  eventClick() {
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].tile.addEventListener("click", () => {
        this.click++;
        this.change(this.tiles[i]);
        if (this.click >= 2) {
          this.click = 0;
        }
      });
    }
  }

  change(tile) {
    let piece = tile.innerElement;
    //In prove
    if(piece.team == "empty"){
      this.click = 2;
    }
    //In prove

    console.log(tile.innerElement);
    if (piece.name == "tower") {
      use.towerValidationAhead(piece.pos, this.wayUp, this.tiles,piece.pos);
      use.towerValidationBack(piece.pos, this.wayDown, this.tiles,piece.pos);
      use.towerValidationRight(piece.pos, this.wayRight, this.tiles,piece.pos);
      use.towerValidationLeft(piece.pos, this.wayLeft, this.tiles,piece.pos);
    } else if (piece.name == "pawn") {
      //This is an algorithm not recursive, because it would convenient work that.
      use.pawnValidation(piece, this.tiles, this.wayUp, this.wayDown,this.wayLeft,this.wayRight,piece.pos);
    } else if (piece.name == "horse") {
      //This is an algorithm not recursive, because it would convenient work that.
      use.horseValidation(piece.pos, this.tiles,piece.pos);
    } else if(piece.name == "bishop"){
      use.bishopValidationUL(piece.pos,this.wayDown,this.wayLeft,this.tiles,piece.pos);
      use.bishopValidationUR(piece.pos,this.wayDown,this.wayRight,this.tiles,piece.pos);
      use.bishopValidationDL(piece.pos,this.wayUp,this.wayLeft,this.tiles,piece.pos);
      use.bishopValidationDR(piece.pos,this.wayUp,this.wayRight,this.tiles,piece.pos);
    } else if(piece.name == "queen"){
      //The queen use the same movements at tower and bishop
      use.towerValidationAhead(piece.pos, this.wayUp, this.tiles,piece.pos);
      use.towerValidationBack(piece.pos, this.wayDown, this.tiles,piece.pos);
      use.towerValidationRight(piece.pos, this.wayRight, this.tiles,piece.pos);
      use.towerValidationLeft(piece.pos, this.wayLeft, this.tiles,piece.pos);
      use.bishopValidationUL(piece.pos,this.wayDown,this.wayLeft,this.tiles,piece.pos);
      use.bishopValidationUR(piece.pos,this.wayDown,this.wayRight,this.tiles,piece.pos);
      use.bishopValidationDL(piece.pos,this.wayUp,this.wayLeft,this.tiles,piece.pos);
      use.bishopValidationDR(piece.pos,this.wayUp,this.wayRight,this.tiles,piece.pos);
    } else if(piece.name == "king"){
      use.kingValidationAhead(piece.pos,this.wayUp,this.tiles,piece.pos);
      use.kingValidationBack(piece.pos,this.wayDown,this.tiles,piece.pos);
      use.kingValidationRight(piece.pos,this.wayRight,this.tiles,piece.pos);
      use.kingValidationLeft(piece.pos,this.wayLeft,this.tiles,piece.pos);
      use.kingValidationUL(piece.pos,this.wayDown,this.wayLeft,this.tiles,piece.pos);
      use.kingValidationUR(piece.pos,this.wayDown,this.wayRight,this.tiles,piece.pos);
      use.kingValidationDL(piece.pos,this.wayUp,this.wayLeft,this.tiles,piece.pos);
      use.kingValidationDR(piece.pos,this.wayUp,this.wayRight,this.tiles,piece.pos);
    }

    //Validate the movement!
    if (this.click == 1) {
      this.pInicial = tile.innerElement;
    } else if (this.click == 2) {
      this.pFinal = tile.innerElement;
      //It's a valid movement
      if (this.pFinal.name == "dot") {
        use.removeDots(this.tiles);
        this.move(this.pInicial, this.pFinal);
        use.removeVuls(this.tiles);
        use.removePiecesVulnerates(this.tiles);
      }else if(this.pFinal.vulnerate == true){
        //The piece can eat
        use.removeDots(this.tiles);
        this.move(this.pInicial,this.pFinal);
        this.killed(this.pFinal);
        use.removeVuls(this.tiles);
        use.removePiecesVulnerates(this.tiles);
      } else {
        //It'snt a valid movement
        use.removeVuls(this.tiles);
        use.removeDots(this.tiles);
        use.removePiecesVulnerates(this.tiles);
      }
    }
  }

  move(pInicial, pFinal) {
    let img = document.createElement("img");
    img.src = pInicial.image;
    console.log(`posInicial : ${pInicial.pos} y posFinal: ${pFinal.pos}`);
    this.tiles[pFinal.pos].removeInnerElement();
    this.tiles[pInicial.pos].toEmpty();
    this.tiles[pFinal.pos].innerElement = pInicial;
    this.tiles[pFinal.pos].innerElement.pos = pFinal.pos;
    this.tiles[pFinal.pos].tile.appendChild(img);
  }

  killed(death) {
    let img = document.createElement("img");
    img.src = death.image;
    if(death.team == "black"){
      for(let it of this.tilesDB){
          if(it.innerElement.name == "empty"){
            it.removeInnerElement();
            it.innerElement = death;
            it.tile.appendChild(img);
            break;
          }
      }
    }else if(death.team == "white"){
      for(let it of this.tilesDW){
        if(it.innerElement.name == "empty"){
          it.removeInnerElement();
          it.innerElement = death;
          it.tile.appendChild(img);
          break;
        }
      }
    }
  }

  resetGame(){
    this.reset.innerHTML = "Nuevo Juego";
    this.reset.addEventListener("click", () => {
    this.main.innerHTML = "";
    this.deathBlack.innerHTML = "";
    this.deathWhite.innerHTML = "";
    this.tiles = [];
    this.tilesDB = [];
    this.tilesDW = [];
    this.createBoard();
    });
  }
}
