export default class Timer {

  constructor(deltaTime = 1/60) {
    let accumulatedTime = 0;
    let lastTime = 0;
    let skipTwo = 0;

    this.updateProxy = (time) => {
      accumulatedTime += (time - lastTime) / 1000;
      lastTime = time;

      // TODO remove hack
      if (skipTwo < 2) {
        accumulatedTime = 0;
        skipTwo += 1;
      }

      while (accumulatedTime > deltaTime) {
        this.update(deltaTime);
        accumulatedTime -= deltaTime;
      }

      this.enqueueFrame();
    }
  }

  enqueueFrame() {
    requestAnimationFrame(this.updateProxy);
  }

  start() {
    this.enqueueFrame();
  }
}
