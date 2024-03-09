import { Door } from "../door";
import { Meep } from "./meep";
import { MeepStateWaitingLift } from "./state-waiting-lift";

export class MeepStateMoving {
  meep: Meep;

  registeredAtDoor?: Door;
  constructor(meep) {
    this.meep = meep;
  }

  /**
   *
   * @param {Game} game
   */
  update(game) {
    this.meep.setVelocityX(-160);
    this.meep.anims.play("player/left", true);

    if (!this.registeredAtDoor) {
      let atDoor: Door;
      if (
        game.physics.overlap(this.meep, game.doors, (meep, door: Door) => {
          atDoor = door;
          door.register(meep);
          door.anims.play("door/open");
        })
      ) {
        return new MeepStateWaitingLift(this.meep, atDoor!);
      }
    }
  }
}
