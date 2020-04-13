export function createCameraLayer(cameraToDraw) {
  return function drawCameraRect(context, fromCamera) {
    // Camera safe area
    context.strokeStyle = "purple";
    context.strokeRect(
      cameraToDraw.bounds.left - fromCamera.pos.x,
      cameraToDraw.bounds.top - fromCamera.pos.y,
      cameraToDraw.bounds.right - cameraToDraw.bounds.left,
      cameraToDraw.bounds.bottom - cameraToDraw.bounds.top
    );
    // Actual camera pos
    context.strokeStyle = "black";
    context.strokeRect(0, 0, cameraToDraw.size.x, cameraToDraw.size.y);
  };
}
