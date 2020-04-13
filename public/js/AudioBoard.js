export default class AudioBoard {
  constructor(context) {
    this.context = context;
    this.buffers = new Map();
  }

  addSound(name, buffer) {
    this.buffers.set(name, buffer);
  }

  play(name) {
    const source = this.context.createBufferSource();

    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.2;
    gainNode.connect(this.context.destination);

    source.connect(gainNode);
    source.buffer = this.buffers.get(name);
    source.start(0);
  }
}
