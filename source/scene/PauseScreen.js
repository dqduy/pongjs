class PauseScreen extends Scene {
    constructor(type = "pause") {
        super(type);
        
        this.items = ["Back to Game", "Restart", "Main Menu"];
        this.outlineFilterRed = new PIXI.filters.GlowFilter(15, 2, 1, 0xff9999, 0.5)
        this.style = new PIXI.TextStyle({
            fontFamily: "Starcraft, Arial",
            fontSize: 36,
            fill: ['#ffffff', '#00ff99']
        });
        this.backText = new PIXI.Text(this.items[0], this.style);
        this.backText.x = (800 - this.backText.width) / 2;
        this.backText.y = 150;
        this.backText.filters = [this.outlineFilterRed];

        this.restartText = new PIXI.Text(this.items[1], this.style);
        this.restartText.x = (800 - this.restartText.width) / 2;
        this.restartText.y = this.backText.y + this.backText.height + 15;
        
        this.mainText = new PIXI.Text(this.items[2], this.style);
        this.mainText.x = (800 - this.mainText.width) / 2;
        this.mainText.y = this.restartText.y + this.restartText.height + 15;
        
        var app = Game.getInstance().getContext();
        app.stage.addChild(this.backText);
        app.stage.addChild(this.restartText);
        app.stage.addChild(this.mainText);
        
        this.currentButton = 0;
        
        this.setup();
    }
    
    setup() { 
        console.log("call setup() Pause " + this.type);
    }
    
    onKeyUp(event) { 
        switch(event.keyCode) {
            case 27: 
                SceneManager.getInstance().setScene(new PlayScreen());
                break;
            case 38:
                this.movePrevious();
                break;
            case 40:
                this.moveNext();
                break;
            case 13:
                this.selectButton();
                break;
                
        }
        
    }
    
    resetText() {
        this.backText.filters = [];
        this.restartText.filters = [];
        this.mainText.filters = [];
    }
    
    movePrevious() {
        switch(this.currentButton) {
            case 0: 
                break;
            case 1:
                this.resetText();
                this.backText.filters = [this.outlineFilterRed];
                this.currentButton--;
                break;
            case 2:
                this.resetText();
                this.restartText.filters = [this.outlineFilterRed];
                this.currentButton--;
                break;
        }
        console.log("movePrevious");
    }
    
    moveNext() {
        switch(this.currentButton) {
            case 0: 
                this.resetText();
                this.restartText.filters = [this.outlineFilterRed];
                this.currentButton++;
                break;
            case 1:
                this.resetText();
                this.mainText.filters = [this.outlineFilterRed];
                this.currentButton++;
                break;
            case 2:
                break;
        }
        console.log("moveNext");
    }
    
    selectButton() {
        switch(this.currentButton) {
            case 0: 
                SceneManager.getInstance().setScene(new PlayScreen());
                break;
            case 1:
                Game.getInstance().scores = [0, 0];
                Game.getInstance().gameState = "playing";
                SceneManager.getInstance().setScene(new PlayScreen());
                break;
            case 2:
                Game.getInstance().reset();
                SceneManager.getInstance().setScene(new MainScreen());
                break;
        }
        console.log("Current Button: " + this.currentButton);
    }
    
    onKeyDown(event) { 
        
    }
    
    update(delta) { 
    }
    
    destroy() {
        var app = Game.getInstance().getContext();
        
        app.stage.removeChild(this.backText);       
        app.stage.removeChild(this.restartText);
        app.stage.removeChild(this.mainText);
    }
    
    resume() {
        
    }
}
