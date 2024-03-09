import { Game } from '../../scenes/Game.js';

export class PlayerStateMoving {
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

    if (game.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }

    if (game.physics.overlap(this.player, game.doors)) {
      console.log("door!")
    }
  }
}
