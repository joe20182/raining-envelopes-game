class SceneStart extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload(){
    // this.load.image("redEnvelopes", "assets/images/red-envelopes.png");
      this.load.image("redEnvelopes", "raining-envelopes-game/assets/images/red-envelopes.png");
    }

    create() {
        // this.scene.start("playGame");
        // return false;

        var cd = gameSetting.cdTime;
        this.cdTxt = this.add.text(config.width/2, config.height/2, '5', {
            fontSize: '150px'
        });
        this.cdTxt.setOrigin(.5, .5);

        var itv = setInterval(() => {
            if (cd == 1) {
                clearInterval(itv);
                this.scene.start("playGame");
                return false;
            }
            cd --;
            this.cdTxt.setText(cd);
        }, 1000);
    }
}