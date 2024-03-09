import { Scene } from 'phaser';
import { Player } from '../objects/player/player.js';
import { Door } from '../objects/door.js';

let player;
let cursors;
let gameOver = false;
let scoreText;

export class Game extends Scene {
  constructor() {
    super('Game');
  }

  create() {
    let levelData = this.cache.json.get('level');
    //  A simple background for our game
    this.add.image(1024 / 2, 768 / 2, "sky");

    const house = this.physics.add.staticGroup();
    levelData.structure.forEach((structure, i) => {
      const f = house.create(structure.x, structure.y, "floor");
      f.setOrigin(0, 0);
      f.displayWidth = structure.w;
      f.displayHeight = structure.h;
      f.refreshBody();
    });


    const doors = this.physics.add.staticGroup();
    const door = new Door(this, 768, 400 - 24);
    doors.add(door);

    // The player and its settings
    player = new Player(this, 850, 250);
    //  Input Events
    // @ts-ignore
    cursors = this.input.keyboard.createCursorKeys();

    //  The score
    scoreText = this.add.text(800, 16, "score: 0", {
      fontSize: "32px",
      color: "#000",
    });

    //  Collide the player with the platforms
    this.physics.add.collider(player, house);
    this.physics.add.overlap(player, doors, this.onDoorCollided);
  }

  update() {
    if (gameOver) {
      return;
    }

    player.update(cursors);
  }

  onDoorCollided(arg1, arg2) {
    arg2.anims.play('door/open')
  }
}
