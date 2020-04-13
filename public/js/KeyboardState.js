const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
  //TODO constructor takes default listenTo?
  constructor() {
    // Holds the current state of a given key
    this.keyStates = new Map();

    // Holds callback function for a given code
    this.keyMap = new Map();
  }

  addMapping(code, callback) {
    this.keyMap.set(code, callback);
  }

  handleEvent(event) {
    const { code } = event; // Extracts code property from object

    if (!this.keyMap.has(code)) {
      return;
    }

    event.preventDefault();

    const keyState = event.type === "keydown" ? PRESSED : RELEASED;

    if (this.keyStates.get(code) === keyState) {
      return;
    }

    this.keyStates.set(code, keyState);
    this.keyMap.get(code)(keyState);
  }

  listenTo(window) {
    ["keydown", "keyup"].forEach((eventName) => {
      window.addEventListener(eventName, (event) => {
        this.handleEvent(event);
      });
    });
  }
}
