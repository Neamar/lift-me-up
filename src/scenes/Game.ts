import { Scene } from "phaser";
import { Player } from "../objects/player/player";
import { Door } from "../objects/door";
import { Meep } from "../objects/meep/meep";
import { LiftDoor } from "../objects/lift-door";

export class Game extends Scene {
  player: Player;
  meeps: Phaser.Physics.Arcade.Group;
  house: Phaser.Physics.Arcade.StaticGroup;
  doors: Phaser.Physics.Arcade.StaticGroup;
  liftDoors: Phaser.Physics.Arcade.StaticGroup;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  scoreText: Phaser.GameObjects.Text;

  constructor() {
    super("Game");
  }

  create() {
    let levelData = this.cache.json.get("level");
    //  A simple background for our game
    this.add.image(1024 / 2, 768 / 2, "sky");

    this.house = this.physics.add.staticGroup();
    levelData.structure.forEach((structure) => {
      const f = this.house.create(structure.x, structure.y, "floor");
      f.setOrigin(0, 0);
      f.displayWidth = structure.w;
      f.displayHeight = structure.h;
      f.refreshBody();
    });

    this.doors = this.physics.add.staticGroup();
    levelData.doors.forEach((doorData) => {
      const door = new Door(this, doorData.x, doorData.y - 24);
      this.doors.add(door);
    });
    (this.doors.getChildren()[0] as Door).createMeep(this);

    this.liftDoors = this.physics.add.staticGroup();
    levelData.liftDoors.forEach((doorData) => {
      const liftDoor = new LiftDoor(this, doorData.x, doorData.y - 24);
      this.liftDoors.add(liftDoor);
    });

    // The player and its settings
    this.player = new Player(this, 850, 250);
    this.physics.add.collider(this.player, this.house);

    this.meeps = this.physics.add.group();
    this.createMeep(500, 350);
    this.physics.add.collider(this.meeps, this.house);

    //  Input Events
    // @ts-ignore
    this.cursors = this.input.keyboard.createCursorKeys();

    //  The score
    this.scoreText = this.add.text(800, 16, "score: 0", {
      fontSize: "32px",
      color: "#000",
    });
  }

  update() {
    this.player.update(this);
    this.meeps.getChildren().forEach((meep) => {
      meep.update(this);
    });
  }

  createMeep(x, y) {
    const meep = new Meep(this, x, y);
    this.meeps.add(meep);
  }
}
