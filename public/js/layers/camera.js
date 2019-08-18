export function createCameraLayer(cameraToDraw) {
  return function drawCameraRect(context, fromCamera) {
    context.strokeStyle = 'purple';
    context.beginPath();
    context.rect(cameraToDraw.bounds.left - fromCamera.pos.x, cameraToDraw.bounds.top - fromCamera.pos.y, cameraToDraw.bounds.right - cameraToDraw.bounds.left, cameraToDraw.bounds.bottom - cameraToDraw.bounds.top);
    context.stroke();
  }
}
