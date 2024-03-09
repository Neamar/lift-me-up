import { MeepStateMoving } from "./state-moving.ts";

export class Meep extends Phaser.Physics.Arcade.Sprite {
  currentState;

  constructor(scene, x, y) {
    super(scene, x, y, "player");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.name = "meep";
    this.anims.play("player/turn");

    //  Player physics properties. Give the little guy a slight bounce.
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    // @ts-ignore
    this.body.syncBounds = true;

    this.currentState = new MeepStateMoving(this);
  }

  update(game) {
    const newState = this.currentState.update(game);
    if (newState) {
      this.currentState = newState;
    }
  }
}
