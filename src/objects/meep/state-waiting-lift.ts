import { Door } from "../door";
import { Meep } from "./meep";

export class MeepStateWaitingLift {
  meep: Meep;

  atDoor: Door;
  constructor(meep, atDoor) {
    this.meep = meep;
    this.atDoor = atDoor;
  }

  /**
   *
   * @param {Game} game
   */
  update(game) {
    const targetX = this.atDoor.requestXPosition(this.meep);

    if (Math.abs(this.meep.x - targetX) < 2) {
      this.meep.setVelocityX(0);
      this.meep.anims.play("player/turn", true);
    } else if (this.meep.x > targetX) {
      this.meep.setVelocityX(-80);
      this.meep.anims.play("player/left", true);
    } else {
      this.meep.setVelocityX(80);
      this.meep.anims.play("player/right", true);
    }
  }
}
