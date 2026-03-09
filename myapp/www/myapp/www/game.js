const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 600,
    parent: "gameContainer",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

let player;
let lanes = [100, 200, 300];
let currentLane = 1;
let obstacles;
let coins;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let scoreText;
let speed = 250;
let gameStarted = false;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('jungle', 'https://labs.phaser.io/assets/skies/jungle.png');
    this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
    this.load.image('fire', 'https://labs.phaser.io/assets/particles/red.png');
    this.load.image('water', 'https://labs.phaser.io/assets/particles/blue.png');
    this.load.image('coin', 'https://labs.phaser.io/assets/sprites/gold_1.png');
    this.load.audio('coinSound', 'https://labs.phaser.io/assets/audio/SoundEffects/p-ping.mp3');
}

function create() {

    this.add.image(200, 300, 'jungle');

    player = this.physics.add.sprite(lanes[currentLane], 500, 'player');
    player.setCollideWorldBounds(true);

    obstacles = this.physics.add.group();
    coins = this.physics.add.group();

    scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '18px', fill: '#fff' });
    this.add.text(10, 30, 'High: ' + highScore, { fontSize: '16px', fill: '#fff' });

    this.add.text(100, 250, 'TAP TO START', { fontSize: '28px', fill: '#fff' });

    this.input.on('pointerdown', () => {
        if (!gameStarted) {
            gameStarted = true;
            this.scene.restart();
        }
    });

    this.physics.add.overlap(player, obstacles, hitObstacle, null, this);
    this.physics.add.overlap(player, coins, collectCoin, null, this);

    // Swipe control
    let startX = 0;
    this.input.on('pointerdown', pointer => startX = pointer.x);
    this.input.on('pointerup', pointer => {
        let diff = pointer.x - startX;
        if (diff > 50 && currentLane < 2) currentLane++;
        if (diff < -50 && currentLane > 0) currentLane--;
    });
}

function update() {

    if (!gameStarted) return;

    player.x = lanes[currentLane];

    speed += 0.02;

    if (Phaser.Math.Between(0, 100) > 97) {
        let lane = Phaser.Math.Between(0, 2);
        let type = Phaser.Math.Between(0, 1);
        let texture = type === 0 ? 'fire' : 'water';

        let obstacle = obstacles.create(lanes[lane], 0, texture);
        obstacle.setVelocityY(speed);
    }

    if (Phaser.Math.Between(0, 100) > 95) {
        let lane = Phaser.Math.Between(0, 2);
        let coin = coins.create(lanes[lane], 0, 'coin');
        coin.setVelocityY(speed);
    }

    score++;
    scoreText.setText('Score: ' + score);
}

function hitObstacle(player, obstacle) {
    if (score > highScore) {
        localStorage.setItem("highScore", score);
    }
    this.physics.pause();
    player.setTint(0xff0000);
    alert("Game Over! Score: " + score);
    location.reload();
}

function collectCoin(player, coin) {
    this.sound.play('coinSound');
    score += 20;
    coin.destroy();
}
