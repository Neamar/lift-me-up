export class PlayerStateMoving {
  constructor(player) {
    this.player = player;
  }

  update(cursors) {
    if (cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play("player/left", true);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play("player/right", true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play("player/turn");
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}
