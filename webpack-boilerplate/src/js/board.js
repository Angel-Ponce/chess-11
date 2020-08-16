import { piece } from "./piece";
import { tile } from "./tile";

export class board {
  constructor(size) {
    this.size = size;
    this.main = document.querySelector(".main");
    this.tiles = [];
  }
  createBoard() {
    let altern = true;
    for (let i = 1; i <= this.size; i++) {
      let pieceN = new piece('empty','empty');
      let tileObj = new tile(i, pieceN);
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
    let Btower1 = new piece("tower", "black");
    this.tiles[0].innerElement = Btower1;

    let Btower2 = new piece("tower", "black");
    this.tiles[7].innerElement = Btower2;

    let Bhorse1 = new piece("horse", "black");
    this.tiles[1].innerElement = Bhorse1;

    let Bhorse2 = new piece("horse", "black");
    this.tiles[6].innerElement = Bhorse2;
  

    let Bbishop1 = new piece("bishop", "black");
    this.tiles[2].innerElement = Bbishop1;

    let Bbishop2 = new piece("bishop", "black");
    this.tiles[5].innerElement = Bbishop2;
   

    let Bking = new piece("king", "black");
    this.tiles[3].innerElement = Bking;
  
    let Bqueen = new piece("queen", "black");
    this.tiles[4].innerElement = Bqueen;
    
    for (let i = 1; i <= 8; i++) {
      let Bpawn = new piece("pawn", "black");
      this.tiles[i + 7].innerElement = Bpawn;
    }

    //Whites
    let Wtower1 = new piece("tower", "white");
    this.tiles[56].innerElement = Wtower1;
  
    let Wtower2 = new piece("tower", "white");
    this.tiles[63].innerElement = Wtower2;
    

    let Whorse1 = new piece("horse", "white");
    this.tiles[57].innerElement = Whorse1;

    let Whorse2 = new piece("horse", "white");
    this.tiles[62].innerElement = Whorse2;
  

    let Wbishop1 = new piece("bishop", "white");
    this.tiles[58].innerElement = Wbishop1;

    let Wbishop2 = new piece("bishop", "white");
    this.tiles[61].innerElement = Wbishop2;
    

    let Wking = new piece("king", "white");
    this.tiles[60].innerElement = Wking;
   
    let Wqueen = new piece("queen", "white");
    this.tiles[59].innerElement = Wqueen;
   
    for (let i = 48; i < 56; i++) {
      let Wpawn = new piece("pawn", "white");
      this.tiles[i].innerElement = Wpawn;
    }

    this.initialPositions();
  }

  initialPositions() {
    for (let i = 0; i < 64; i++) {
      let img = document.createElement("img");
      img.src = this.tiles[i].innerElement.image;
      this.tiles[i].tile.appendChild(img);
      console.log(this.tiles[i].innerElement);
    }
  }
}
