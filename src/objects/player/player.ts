import { PlayerStateMoving } from "./state-moving.ts";

export class Player extends Phaser.Physics.Arcade.Sprite {
  currentState;

  constructor(scene, x, y) {
    super(scene, x, y, "player");
    // scene.sys.displayList.add(this);
    // scene.sys.updateList.add(this);
    // scene.physics.world.enableBody(this, 0);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.name = "player";
    this.anims.play("player/turn");

    //  Player physics properties. Give the little guy a slight bounce.
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    // @ts-ignore
    this.body.syncBounds = true;

    this.currentState = new PlayerStateMoving(this);
  }

  update(game) {
    this.currentState.update(game);
  }
}
