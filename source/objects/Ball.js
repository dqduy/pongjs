class Ball extends Pixi.Sprite {
    constructor() {
        super();
        
        this.setup();
    }
    
    setup() {
        this.texture = PIXI.Texture.fromImage(Game.getInstance().appConfig.ballRes);
    }
    
    update(delta, leftPlayer, rightPlayer) {
        
    }
    
}
