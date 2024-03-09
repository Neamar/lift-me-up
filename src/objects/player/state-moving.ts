import { Game } from "../../scenes/Game";
import { Door } from "../door";
import { Player } from "./player";

export class PlayerStateMoving {
  player: Player;

  constructor(player) {
    this.player = player;
  }

  /**
   *
   * @param {Game} game
   */
  update(game) {
    if (game.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play("player/left", true);
    } else if (game.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play("player/right", true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play("player/turn");
    }

    if (game.cursors.up.isDown && this.player.body!.touching.down) {
      this.player.setVelocityY(-330);
    }

    game.physics.overlap(
      this.player,
      game.doors,
      (player, door: Phaser.Physics.Arcade.Sprite) => {
        door.anims.play("door/open");
      }
    );
  }
}
