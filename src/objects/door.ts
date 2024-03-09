import { Meep } from "./meep/meep";

export class Door extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "door");
    scene.add.existing(this);
    scene.physics.add.existing(this, 1);
    this.name = "door";
  }
}
