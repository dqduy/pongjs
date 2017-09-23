class MainScreen extends Scene {
    constructor(type = "main") {
        super(type);
        
        this.items = ["Play Single Game!", "Multiplayer"];

        this.outlineFilterBlue = new PIXI.filters.OutlineFilter(2, 0x99ff99);
        this.outlineFilterRed = new PIXI.filters.GlowFilter(15, 2, 1, 0xff9999, 0.5)

        this.style = new PIXI.TextStyle({
            fontFamily: "Starcraft",
            fontSize: 36,
            fill: ['#ffffff', '#00ff99']
        });
        this.playText = new PIXI.Text(this.items[0], this.style);
        this.playText.x = (800 - this.playText.width) / 2;
        this.playText.y = 200;
        this.playText.filters = [this.outlineFilterRed];
        
        this.multiText = new PIXI.Text(this.items[1], this.style);
        this.multiText.x = (800 - this.multiText.width) / 2;
        this.multiText.y = this.playText.y + this.playText.height + 20;
        //this.multiText.filters = [this.outlineFilterRed];
        
        var app = Game.getInstance().getContext();
        app.stage.addChild(this.playText);
        app.stage.addChild(this.multiText);
        
        this.currentButton = 0;
        
        this.setup();
    }
    
    setup() {
        console.log("call setup() Main");
            
    }
    
    onKeyUp(event) { 
        if(event.keyCode == 38)
            this.movePrevious();
        else if(event.keyCode == 40)
            this.moveNext();
        else if(event.keyCode == 13)
            this.selectButton();
    }
    
    onKeyDown(event) { 
    }

    movePrevious() {
        if(this.currentButton == 1) {
            this.currentButton = 0;
            this.playText.filters = [this.outlineFilterRed];
            this.multiText.filters = [];
        }
        console.log("movePrevious");
    }
    
    moveNext() {
        if(this.currentButton == 0) {
            this.currentButton = 1;
            this.playText.filters = [];
            this.multiText.filters = [this.outlineFilterRed];
        }
        console.log("moveNext");
    }
    
    selectButton() {
        if(this.currentButton == 0) {
            Game.getInstance().gameMode = "single";
            SceneManager.getInstance().setScene(new PlayScreen());
        }
        else if(this.currentButton == 1){
            Game.getInstance().gameMode = "multi";
            SceneManager.getInstance().setScene(new PlayScreen());
        }
        console.log("Current Button: " + this.currentButton);
    }
    
    update(delta) { 
        
    }
    
    destroy() {
        var app = Game.getInstance().getContext();
        app.stage.removeChild(this.playText);
        app.stage.removeChild(this.multiText);
    }
    
    resume() {
        
    }
}
