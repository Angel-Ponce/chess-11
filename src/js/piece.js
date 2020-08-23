//import { constants } from "./constants";
import * as topic from "./constants";

export class piece {
  constructor(name, team, pos) {
    this.name = name;
    this.team = team;
    this.image = topic.empty;
    this.pos = pos;
    this.vulnerate = false;
    this.chooseImage();
  }
  chooseImage() {
    if (this.team == "black") {
      if (this.name == "tower") {
        this.image = topic.towerBlack;
      } else if (this.name == "horse") {
        this.image = topic.horseBlack;
      } else if (this.name == "bishop") {
        this.image = topic.bishopBlack;
      } else if (this.name == "king") {
        this.image = topic.kingBlack;
      } else if (this.name == "queen") {
        this.image = topic.queenBlack;
      } else if (this.name == "pawn") {
        this.image = topic.pawnBlack;
      }
    } else if (this.team == "white") {
      if (this.name == "tower") {
        this.image = topic.towerWhite;
      } else if (this.name == "horse") {
        this.image = topic.horseWhite;
      } else if (this.name == "bishop") {
        this.image = topic.bishopWhite;
      } else if (this.name == "king") {
        this.image = topic.kingWhite;
      } else if (this.name == "queen") {
        this.image = topic.queenWhite;
      } else if (this.name == "pawn") {
        this.image = topic.pawnWhite;
      }
    } else if(this.team == 'dot') {
      this.image = topic.dot;
    }else{
      this.image = topic.empty;
    }
  }
}
