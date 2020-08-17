import { piece } from "./piece";
import { tile } from "./tile";
import * as use from "./movements";

export class board {
  constructor(size) {
    this.size = size;
    this.main = document.querySelector(".main");
    this.tiles = [];
    this.pieceAux = new piece("empty", "empty");
    this.wayDown = [0, 1, 2, 3, 4, 5, 6, 7];
    this.wayUp = [56, 57, 58, 59, 60, 61, 62, 63];
    this.wayLeft = [0, 8, 16, 24, 32, 40, 48, 56];
    this.wayRight = [7, 15, 23, 31, 39, 47, 55, 63];
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
      let newPiece = this.tiles[i].innerElement;
      this.tiles[i].tile.addEventListener("click", () => {
        this.change(newPiece);
      });
    }
  }

  change(piece) {
    this.pieceAux = piece;

    if (piece.name == "tower") {
      console.log(piece.name);
      use.towerValidationAhead(piece.pos,this.wayUp,this.tiles);
      use.towerValidationBack(piece.pos,this.wayDown,this.tiles);
      use.towerValidationRight(piece.pos,this.wayRight,this.tiles);
    }
  }

}
