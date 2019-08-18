import Entity, { Trait } from '../Entity.js';
import {loadSpriteSheet} from '../loaders.js';
import PendulumMove from '../traits/PendulumMove.js'
import Killable from '../traits/Killable.js'
import Solid from '../traits/Solid.js'
import Physics from '../traits/Physics.js'

const STATE_WALKING = Symbol('walking')
const STATE_HIDING = Symbol('hiding')
const STATE_KICKED = Symbol('kicked')


class Behaviour extends Trait {
  constructor() {
    super('behaviour')
    this.hideTime = 0
    this.hideDuration = 5

    this.kickSpeed = 200

    this.state = STATE_WALKING
  }

  collides(us, them) {
    if (us.killable.dead) return

    if (them.stomper) {
      if (them.vel.y > us.vel.y) {
        this.handleStomp(us, them)
      } else {
        this.handleKick(us, them)
      }
    }
  }

  handleKick(us, them) {
    if (this.state === STATE_WALKING) {
      them.killable.kill()
    } else if (this.state === STATE_HIDING) {
      this.kick(us, them)
    } else if (this.state === STATE_KICKED) {
      const travelDir = Math.sign(us.vel.x)
      const impactDir = Math.sign(us.pos.x - them.pos.x)
      if (travelDir !== 0 && travelDir !== impactDir) {
        them.killable.kill()
      }
    }
  }

  handleStomp(us, them) {
    if (this.state === STATE_WALKING) {
      this.hide(us)
    } else if (this.state === STATE_HIDING) {
        this.handleKick(us, them)
    } else if (this.state === STATE_KICKED) {
      this.hide(us)
    }
  }

  hide(us) {
    this.hideTime = 0
    us.vel.x = 0
    us.pendulumMove.enabled = false
    this.state = STATE_HIDING
  }

  unhide(us) {
    us.pendulumMove.resetSpeed()
    us.pendulumMove.enabled = true
    this.state = STATE_WALKING
  }

  kick(us, them) {
    us.pendulumMove.speed = this.kickSpeed
    us.pendulumMove.heading = them.go.heading
    us.pendulumMove.enabled = true
    this.state = STATE_KICKED
  }

  update(us, deltaTime) {
    if (this.state === STATE_HIDING) {
      this.hideTime += deltaTime
      if (this.hideTime > this.hideDuration) {
        this.unhide(us)
      }
    }
  }
}

export function loadKoopa() {
  return loadSpriteSheet('koopa')
    .then(createKoopaFactory)
}

function createKoopaFactory(sprite) {

  const walkAnim = sprite.animations.get('walk')
  const wiggleAnim = sprite.animations.get('wiggle')

  function routeAnim(koopa) {
    if (koopa.behaviour.state === STATE_HIDING && koopa.behaviour.hideTime > 4) {
      return wiggleAnim(koopa.behaviour.hideTime)
    }
    if (koopa.behaviour.state === STATE_HIDING || koopa.behaviour.state === STATE_KICKED) {
      return 'hiding'
    }

    return walkAnim(koopa.lifetime)
  }

  function drawKoopa(context) {
    sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
  }

  return function createKoopa() {
    const koopa = new Entity();
    koopa.size.set(12, 16);
    koopa.offset.set(3, 8, -1, -8)

    koopa.addTrait(new Solid())
    koopa.addTrait(new Physics())
    koopa.addTrait(new PendulumMove())
    koopa.addTrait(new Behaviour())
    koopa.addTrait(new Killable())

    koopa.draw = drawKoopa

    return koopa;
  }
}
