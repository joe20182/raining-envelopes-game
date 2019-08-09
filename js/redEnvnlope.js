class RedEnvelope extends Phaser.GameObjects.Image{
    constructor(scene, x, y) {
        super(scene, x, y, 'redEnvelopes');

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setGravityY(Phaser.Math.Between(120, 500));
        this.angle = Phaser.Math.Between(-30, 30);
        // this.body.velocity.y = Phaser.Math.Between(120, 500);
        this.setInteractive();
        scene.projectiles.add(this);
    }

    update() {
        if (this.y > config.height) {
            this.destroy();
            console.log('destroyed!');
        }
    }
}