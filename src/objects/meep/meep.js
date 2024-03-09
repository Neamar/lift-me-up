import { MeepStateMoving } from './state-moving.js';

export class Meep extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.name = "meep";
    this.anims.play("player/turn");

    //  Player physics properties. Give the little guy a slight bounce.
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    this.body.syncBounds = true;

    this.currentState = new MeepStateMoving(this);
  }

  update(game) {
    this.currentState.update(game);
  }
}
