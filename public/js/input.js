import Keyboard from './KeyboardState.js';

export function setupKeyboard(mario) {
  const input = new Keyboard();

  input.addMapping("Space", (keyState) => {
    if (keyState) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });

  ["ArrowLeft", "KeyA"].forEach(code => {
    input.addMapping(code, (keyState) => {
      mario.go.dir = -keyState;
    });
  });

  ["ArrowRight", "KeyD"].forEach(code => {
    input.addMapping(code, (keyState) => {
      mario.go.dir = keyState;
    });
  });

  return input;
}
