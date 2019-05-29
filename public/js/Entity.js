import {Vec2} from './math.js';
import BoundingBox from './BoundingBox.js'

export const Sides = {
  TOP: Symbol('top'),
  BOTTOM: Symbol('bottom'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right'),
};

export class Trait {
  constructor(name) {
    this.NAME = name;

    this.tasks = []
  }

  finalise() {
    this.tasks.forEach(task => task())
    this.tasks.length = 0
  }

  queue(task) {
    this.tasks.push(task)
  }

  collides(us, them) {
  }

  obstruct(side) {
  }

  update(entity, deltaTime, level) {
  }
}

export default class Entity {
  constructor() {
    this.lifetime = 0
    this.canCollide = true

    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);
    this.offset = new Vec2(0, 0);
    this.bounds = new BoundingBox(this.pos, this.size, this.offset)

    this.traits = [];
  }

  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  collides(candidate) {
    this.traits.forEach(trait => {
      trait.collides(this, candidate);
    });
  }

  obstruct(side) {
    this.traits.forEach(trait => {
      trait.obstruct(this, side);
    });
  }

  draw() {

  }

  finalise() {
    this.traits.forEach(trait => trait.finalise())
  }

  update(deltaTime, level) {
    this.lifetime += deltaTime

    this.traits.forEach(trait => {
      trait.update(this, deltaTime, level);
    });
  }

}
