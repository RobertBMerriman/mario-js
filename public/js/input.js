import Keyboard from './KeyboardState.js';

export function setupKeyboard(entity) {
  const input = new Keyboard();

  ["KeyK", "KeyX", "Space", "KeyW", "ArrowUp"].forEach(code => {
    input.addMapping(code, (keyState) => {
      if (keyState) {
        entity.jump.start();
      } else {
        entity.jump.cancel();
      }
    });
  });

  ["KeyL", "KeyZ"].forEach(code => {
    input.addMapping(code, (keyState) => {
      entity.go.dragFactor = keyState ? entity.go.runDrag: entity.go.walkDrag;
    });
  });

  ["ArrowLeft", "KeyA"].forEach(code => {
    input.addMapping(code, (keyState) => {
      entity.go.dir += keyState ? -1 : 1;
    });
  });

  ["ArrowRight", "KeyD"].forEach(code => {
    input.addMapping(code, (keyState) => {
      entity.go.dir += keyState ? 1 : -1;
    });
  });

  return input;
}
