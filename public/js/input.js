import Keyboard from './KeyboardState.js';

export function setupKeyboard(mario) {
  const input = new Keyboard();

  ["Space", "ArrowUp", "KeyW", "KeyO", "KeyK", "KeyX"].forEach(code => {
    input.addMapping(code, (keyState) => {
      if (keyState) {
        mario.jump.start();
      } else {
        mario.jump.cancel();
      }
    });
  });

  ["KeyP", "KeyL", "KeyZ"].forEach(code => {

  });

  ["ArrowLeft", "KeyA"].forEach(code => {
    input.addMapping(code, (keyState) => {
      mario.go.dir += keyState ? -1 : 1;
    });
  });

  ["ArrowRight", "KeyD"].forEach(code => {
    input.addMapping(code, (keyState) => {
      mario.go.dir += keyState ? 1 : -1;
    });
  });

  return input;
}
