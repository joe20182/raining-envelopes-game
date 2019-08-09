var gameSetting = {
    cdTime: 5,
    maxEnveCount: 10
}

var config = {
    parent: 'game-parent',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [SceneStart, SceneGaming],
    transparent: true,
    physics: {
        default: 'arcade',
        arcade:{
            debug: false,
            debugShowVelocity: false,
            // gravity: {
            //     y: 300
            // }
        }
    }
}

var game = new Phaser.Game(config);