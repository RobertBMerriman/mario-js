const FONT_SIZE = 8;

export default class Button {
  x;
  y;
  w;
  h;
  text;
  bgColor;
  onClick;

  constructor(x, y, w, h, text, bgColor, onClick) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.bgColor = bgColor;
    this.onClick = onClick;
  }

  draw(context) {
    context.fillStyle = this.bgColor;
    context.fillRect(this.left, this.top, this.w, this.h);
    context.fillStyle = "black";
    context.fillText(this.text, this.x - (this.text.length * FONT_SIZE) / 2, this.y - FONT_SIZE / 2);
  }

  checkForClick(mouseX, mouseY) {
    const mouseXScaled = mouseX / 2;
    const mouseYScaled = mouseY / 2;
    if (
      mouseXScaled > this.left &&
      mouseXScaled < this.right &&
      mouseYScaled > this.top &&
      mouseYScaled < this.bottom
    ) {
      this.onClick();
    }
  }

  get left() {
    return this.x - this.w / 2;
  }

  get right() {
    return this.x + this.w / 2;
  }

  get top() {
    return this.y - this.h / 2;
  }

  get bottom() {
    return this.y + this.h / 2;
  }
}
