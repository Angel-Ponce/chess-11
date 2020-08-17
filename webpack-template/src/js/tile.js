export class tile {
  constructor(pos, innerElement) {
    this.tile = document.createElement("div");
    this.pos = pos;
    this.tile.id = `tile-${pos}`;
    this.tile.classList.add("tile");
    this.innerElement = innerElement;
  }
}
