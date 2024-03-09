import { Scene } from "phaser";
import { Player } from "../objects/player/player";
import { Door } from "../objects/door";
import { Meep } from "../objects/meep/meep";

export class Game extends Scene {
  player: Player;
  meeps: Phaser.Physics.Arcade.Group;
  house: Phaser.Physics.Arcade.StaticGroup;
  doors: Phaser.Physics.Arcade.StaticGroup;
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
    levelData.structure.forEach((structure, i) => {
      const f = this.house.create(structure.x, structure.y, "floor");
      f.setOrigin(0, 0);
      f.displayWidth = structure.w;
      f.displayHeight = structure.h;
      f.refreshBody();
    });

    this.doors = this.physics.add.staticGroup();
    const door = new Door(this, 768, 400 - 24);
    this.doors.add(door);
    this.doors.add(new Door(this, 100, 300 - 24, 2));
    this.doors.add(new Door(this, 100, 500 - 24, 2.5));
    this.doors.add(new Door(this, 100, 700 - 24));

    // The player and its settings
    this.player = new Player(this, 850, 250);
    this.physics.add.collider(this.player, this.house);

    this.meeps = this.physics.add.group();
    const meep = new Meep(this, 500, 350);
    this.meeps.add(meep);
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
}
