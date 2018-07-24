export function createAnim(frames, frameDuration) {
  return function resolveFrame(distance) {
    const frameIndex = Math.floor(distance / frameDuration % frames.length);
    return frames[frameIndex];
  }
}
