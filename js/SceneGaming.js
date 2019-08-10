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

        // count down timer
        this.gamingTime = gameSetting.gamingTime;
        this.time.addEvent({
            delay: 1000,
            callback: this.countDownGaming,
            callbackScope: this,
            repeat: gameSetting.gamingTime
        });
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

    countDownGaming() {
        if (this.gamingTime === 0) {
            console.log('End Game.');
            this.endTxt = this.add.text(config.width/2, config.height/2, 'Score: ' + this.totalScore, {
                fontSize: '60px',
                fill: 'green'
            });
            this.endTxt.setOrigin(.5, .5);
            this.scene.pause();
            // console.log(this);
        }
        // console.log(this.gamingTime);
        this.gamingTime --;
    }
}