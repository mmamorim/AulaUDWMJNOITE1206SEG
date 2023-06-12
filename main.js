
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let plataformas
let boneco, inimigo
let cursors

function preload() {
    this.load.image('fundo','./assets/space3.png')
    this.load.image('plataforma','./assets/plataforma.png')
    this.load.spritesheet('dude',
        './assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );

}

function create() {

    this.add.image(400, 300, 'fundo');

    plataformas = this.physics.add.staticGroup();
    plataformas.create(100, 400, 'plataforma');
    plataformas.create(600, 300, 'plataforma');
    plataformas.create(100, 200, 'plataforma');

    boneco = this.physics.add.sprite(500, 50, 'dude');
    boneco.setBounceY(0.3);
    boneco.setCollideWorldBounds(true);
    this.physics.add.collider(boneco, plataformas);

    inimigo = this.physics.add.sprite(100, 50, 'dude');
    inimigo.setBounceY(0.3);
    inimigo.setCollideWorldBounds(true);
    this.physics.add.collider(inimigo, plataformas);

    this.anims.create({
        key: 'dude_esq',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'dude_dir',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'dude_parado',
        frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 4 }),
        frameRate: 10,
        repeat: -1
    });

    boneco.anims.play('dude_parado',true)
    inimigo.anims.play('dude_parado',true)

    this.physics.add.collider(inimigo, boneco);

    inimigo.setVelocityX(100)
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    
    if(cursors.left.isDown) {
        boneco.setVelocityX(-100)
        boneco.anims.play('dude_esq',true)
    } else {
        if(cursors.right.isDown) {
            boneco.setVelocityX(100)
            boneco.anims.play('dude_dir',true)
        } else {
            if(cursors.up.isDown) {
                //boneco.setVelocityY(-100)
                boneco.anims.play('dude_parado',true)
            } else {
                boneco.setVelocityX(0)
                boneco.anims.play('dude_parado',true)
            }
        }
    }

    if(inimigo.body.x < 200) {
        inimigo.setVelocityX(100);
        inimigo.anims.play('dude_dir', true);
    } else {
        if(inimigo.body.x > 600) {
            inimigo.anims.play('dude_esq', true);
            inimigo.setVelocityX(-100);
        }
    }

    if (cursors.up.isDown && boneco.body.touching.down) {
        boneco.setVelocityY(-200);
    }
}

const game = new Phaser.Game(config);