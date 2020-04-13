export function setupMouseControl(canvas, entity, camera) {
  let lastEvent = event;

  ["mousedown", "mousemove"].forEach((eventName) => {
    canvas.addEventListener(eventName, (event) => {
      if (event.buttons === 1) {
        entity.vel.set(0, 0);
        entity.pos.set(
          event.offsetX + camera.pos.x - entity.size.x / 2,
          event.offsetY + camera.pos.y - entity.size.y / 2
        );
        entity.floating = true;
      } else if (event.buttons === 2 && lastEvent && lastEvent.buttons === 2 && lastEvent.type === "mousemove") {
        camera.pos.x -= event.offsetX - lastEvent.offsetX;
      }
      lastEvent = event;
    });
  });

  canvas.addEventListener("mouseup", (event) => {
    entity.floating = false;
  });

  canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}
