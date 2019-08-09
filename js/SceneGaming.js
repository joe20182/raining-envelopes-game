class SceneGaming extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        this.totalScore = 0;

        this.projectiles = this.add.group();
        for (var i = 0; i < gameSetting.maxEnveCount; i++) {
            var enve = new RedEnvelope(this, Phaser.Math.Between(0, game.config.width), Phaser.Math.Between(0, -300));
        }

        this.input.on('gameobjectdown', this.gotcha, this);
    }

    update() {
        for (var i = 0; i < this.projectiles.getChildren().length; i++) {
            var enve = this.projectiles.getChildren()[i];
            enve.update();
        }
        if (this.projectiles.getChildren().length < gameSetting.maxEnveCount) {
            var enve = new RedEnvelope(this, Phaser.Math.Between(0, game.config.width), Phaser.Math.Between(0, -300));
        }
    }

    gotcha(pointer, gameObj) {
        // console.log(pointer.downX + ' : ' + pointer.downY);
        gameObj.body.setGravityY(-300);
        gameObj.disableInteractive();

        var scoreTxt = this.add.text(pointer.downX, pointer.downY, '+1', {
            fontSize: '60px',
            fill: 'yellow'
        });
        this.totalScore ++;
        console.log(this.totalScore);

        var tween = this.tweens.add({
            targets: gameObj,
            duration: 1000,
            alpha: 0,
            repeat: 0,
            onComplete: function() {
                gameObj.destroy();
                scoreTxt.destroy();
                // console.log('ok');
            },
            callbackScope: this
        });
    }
}