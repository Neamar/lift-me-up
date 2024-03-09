import { LiftDoor } from "../lift-door";
import { Meep } from "./meep";
import { MeepStateWaitingLift } from "./state-waiting-lift";

export class MeepStateMoving {
  meep: Meep;

  registeredAtDoor?: LiftDoor;
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
      let atDoor: LiftDoor;
      if (
        game.physics.overlap(
          this.meep,
          game.liftDoors,
          (meep, door: LiftDoor) => {
            atDoor = door;
            door.register(meep);
            door.anims.play("door/open");
          }
        )
      ) {
        return new MeepStateWaitingLift(this.meep, atDoor!);
      }
    }
  }
}
