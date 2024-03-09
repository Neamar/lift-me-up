import { Game } from "../../scenes/Game.js";
import { Meep } from "./meep.ts/index.js";

export class MeepStateMoving {
  /**
   * @type Meep
   */
  meep;

  constructor(meep) {
    this.meep = meep;
  }

  /**
   *
   * @param {Game} game
   */
  update(game) {
    // this.meep.setVelocityX(-160);
    // this.meep.anims.play("player/left", true);

    game.physics.overlap(
      this.meep,
      game.doors,
      (meep, door: Phaser.Physics.Arcade.Sprite) => {
        console.log("overlap");
        door.anims.play("door/open");
      }
    );
  }
}
