import { piece } from "./piece";

export class tile {
  constructor(pos, innerElement) {
    this.tile = document.createElement("div");
    this.pos = pos;
    this.tile.id = `tile-${pos}`;
    this.tile.classList.add("tile");
    this.innerElement = innerElement;
  }

  removeInnerElement(){
    this.tile.innerHTML = '';
  }

  toEmpty(){
    let imgNull = document.createElement("img");
    let pieceNull = new piece('empty','empty',this.pos);
    imgNull.src = pieceNull.image;
    this.removeInnerElement();
    this.innerElement = pieceNull;
    this.tile.appendChild(imgNull);
  }

  changeInnerElement(pos){
    this.innerElement.pos = pos;
  }

}
