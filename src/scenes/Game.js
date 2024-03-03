import { Scene } from 'phaser';

let player;
let stars;
let bombs;
let cursors;
let score = 0;
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
    const floorHeight = 700 / levelData.floors.length;
    const ceilingHeight = 768 - (levelData.floors.length) * floorHeight
    levelData.floors.forEach((floor, i) => {
      const f = house.create(300, 768 - 16 - i * floorHeight, "floor")
      f.displayWidth = 600;
      f.refreshBody();
    });

    const ceiling = house.create(300, ceilingHeight - 16, "floor")
    ceiling.displayWidth = 600;
    ceiling.refreshBody();

    const leftWall = house.create(16, (768 - ceilingHeight) / 2 + 64, "floor")
    leftWall.displayHeight = (768 - ceilingHeight);
    leftWall.refreshBody();

    const rightWall = house.create(600 - 16, (768 - ceilingHeight) / 2 + 64, "floor")
    rightWall.displayHeight = (768 - ceilingHeight);
    rightWall.refreshBody();

    const platform = house.create(850, 400, "floor")
    platform.displayWidth = 300;
    platform.refreshBody();

    // The player and its settings
    player = this.physics.add.sprite(850, 350, "dude");

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

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
  }

  update() {
    if (gameOver) {
      return;
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
}
