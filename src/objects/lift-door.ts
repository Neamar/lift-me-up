import { Meep } from "./meep/meep";

export class LiftDoor extends Phaser.Physics.Arcade.Sprite {
  inQueue: Meep[] = [];

  constructor(scene, x, y) {
    super(scene, x, y, "door");
    scene.add.existing(this);
    scene.physics.add.existing(this, 1);
    this.name = "liftDdoor";

    this.displayWidth = this.width * 2.5;
    this.refreshBody();
  }

  register(meep: Meep) {
    this.inQueue.push(meep);
  }

  requestXPosition(meep: Meep) {
    return (
      this.x -
      this.displayWidth / 2 +
      (this.displayWidth / (1 + this.inQueue.length)) *
        (1 + this.inQueue.indexOf(meep))
    );
  }
}
