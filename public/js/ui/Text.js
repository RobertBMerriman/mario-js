import { font } from "../main.js";

const FONT_SIZE = 8;

export default class Text {
  constructor(x, y, text, textColor, sizeMultiplier = 1) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.textColor = textColor;
    this.sizeMultiplier = sizeMultiplier;
  }

  draw(context) {
    context.fillStyle = this.textColor;
    context.font = font(this.sizeMultiplier);
    context.fillText(
      this.text,
      this.x - (this.text.length * FONT_SIZE * this.sizeMultiplier) / 2,
      this.y - (FONT_SIZE * this.sizeMultiplier) / 2
    );
    context.font = font();
  }

  checkForClick(mouseX, mouseY) {
    return;
  }
}
