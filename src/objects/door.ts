import { Meep } from "./meep/meep";

export class Door extends Phaser.Physics.Arcade.Sprite {
  inQueue: Meep[] = [];

  constructor(scene, x, y, scaleX = 1) {
    super(scene, x, y, "door");
    scene.add.existing(this);
    scene.physics.add.existing(this, 1);
    this.name = "door";

    this.displayWidth = this.width * scaleX;
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
