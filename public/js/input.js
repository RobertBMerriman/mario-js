import Keyboard from "./KeyboardState.js";

export function setupKeyboard(entity) {
  const keyboard = new Keyboard();

  ["KeyK", "KeyX", "Space", "KeyW", "ArrowUp"].forEach((code) => {
    keyboard.addMapping(code, (keyState) => {
      if (keyState) {
        entity.jump.start();
      } else {
        entity.jump.cancel();
      }
    });
  });

  ["KeyL", "KeyZ", "ShiftLeft", "ShiftRight"].forEach((code) => {
    keyboard.addMapping(code, (keyState) => {
      entity.go.dragFactor = keyState ? entity.go.runDrag : entity.go.walkDrag;
    });
  });

  ["ArrowLeft", "KeyA"].forEach((code) => {
    keyboard.addMapping(code, (keyState) => {
      entity.go.dir += keyState ? -1 : 1;
    });
  });

  ["ArrowRight", "KeyD"].forEach((code) => {
    keyboard.addMapping(code, (keyState) => {
      entity.go.dir += keyState ? 1 : -1;
    });
  });

  return keyboard;
}

export function setupMouse(canvas, uiElements) {
  ["click"].forEach((eventName) => {
    canvas.addEventListener(eventName, (event) => {
      event.preventDefault();
      uiElements.forEach((el) => {
        el.checkForClick(event.offsetX, event.offsetY);
      });
    });
  });
}
