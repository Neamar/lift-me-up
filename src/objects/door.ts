import { Game } from "../scenes/Game";
import { Meep } from "./meep/meep";

export class Door extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "door");
    scene.add.existing(this);
    scene.physics.add.existing(this, 1);
    this.name = "door";
  }

  createMeep(game: Game) {
    this.anims.play("door/open");
    this.once("animationcomplete", () => {
      game.createMeep(this.x, this.y);
      this.anims.play("door/close");
    });
  }
}
