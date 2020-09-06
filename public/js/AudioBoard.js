export default class AudioBoard {
  constructor() {
    this.buffers = new Map();
  }

  addSound(name, buffer) {
    this.buffers.set(name, buffer);
  }

  play(name, audioContext) {
    const source = audioContext.createBufferSource();

    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.2;
    gainNode.connect(audioContext.destination);

    source.connect(gainNode);
    source.buffer = this.buffers.get(name);
    source.start(0);
  }
}
