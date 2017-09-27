class PlayScreen extends Scene {
    constructor(type = "play") {
        super(type);
        
        //Member Variables
        this.ball = null;
        this.homeUser = null;
        this.awayUser = null;
        this.homeResult = null;
        this.awayResult = null;
        this.lines = [];
        
        //Member Functions
        this.setup();
    }
    
    onKeyUp(event) { 
        switch(event.keyCode) {
            case 27:    //Esc
                console.log("PlayScreen Up");
                Game.getInstance().gameState = "pausing";
                this.saveState();
                SceneManager.getInstance().setScene(new PauseScreen());
                break;
            case 81:    //Q
                if(!this.homeUser.auto)
                    this.homeUser.stopMovingUp();
                break;
            case 65:    //A
                if(!this.homeUser.auto)
                    this.homeUser.stopMovingDown();
                break;
            case 80:    //P
                if(!this.awayUser.auto)
                    this.awayUser.stopMovingUp();
                break;
            case 76:    //L
                if(!this.awayUser.auto)
                    this.awayUser.stopMovingDown();
                break;
                
        }
        /* if(event.keyCode == 27) {  //Esc
            console.log("PlayScreen Up");
            Game.getInstance().gameState = "pausing";
            this.saveState();
            SceneManager.getInstance().setScene(new PauseScreen());
        } */
    }
    
    onKeyDown(event) {
        switch(event.keyCode) {
            case 81:    //Q
                if(!this.homeUser.auto)
                    this.homeUser.moveUp();
                break;
            case 65:    //A
                if(!this.homeUser.auto)
                    this.homeUser.moveDown();
                break;
            case 80:    //P
                if(!this.awayUser.auto)
                    this.awayUser.moveUp();
                break;
            case 76:    //L
                if(!this.awayUser.auto)
                    this.awayUser.moveDown();
                break;
                
        }
        /* if(event.keyCode == 81) {         //Q
            if(this.homeUser.y > 0)
                this.homeUser.y -= 30;
            else this.homeUser.y = 0;
        }
        else if (event.keyCode == 65) {  //A
                if(this.homeUser.y < 500 - this.homeUser.height) {
                    this.homeUser.y += 30;
                } else this.homeUser.y = 500 - this.homeUser.height;
            }
        else if(event.keyCode == 80)   //P
            this.awayUser.y -= 30;
        else if(event.keyCode == 76)   //L
            this.awayUser.y += 30; */
    }
    
    saveState() {
        Game.getInstance().savedBundle = {xball: this.ball.x, yball: this.ball.y, xhome: this.homeUser.x, yhome: this.homeUser.y, xaway: this.awayUser.x, yaway: this.awayUser.y, scores: Game.getInstance().scores};
        console.log("PlayScreen::saveState()");
    }
    
    resume() {
        var bundle = Game.getInstance().savedBundle;
        this.ball.x = bundle.xball;
        this.ball.y = bundle.yball;
        this.homeUser.x = bundle.xhome;
        this.homeUser.y = bundle.yhome;
        this.awayUser.x = bundle.xaway;
        this.awayUser.y = bundle.yaway;
        this.homeResult.text = bundle.scores[0];
        this.awayResult.text = bundle.scores[1];
        console.log("PlayScreen::resume()");
    }
    
    destroy() {
        var app = Game.getInstance().getContext();
        
        app.stage.removeChild(this.ball);
        for(var i = 0; i < this.lines.length; ++i)
            app.stage.removeChild(this.lines[i]);
        app.stage.removeChild(this.homeUser);
        app.stage.removeChild(this.awayUser);
        app.stage.removeChild(this.homeResult);
        app.stage.removeChild(this.awayResult);
    }
    
    level(playerNo) {
        return 8 + (Game.getInstance().scores[playerNo] - Game.getInstance().scores[playerNo ? 0 : 1]);
    }
    
    goal(playerNo) {
        Game.getInstance().scores[playerNo]++;
        
        this.ball.reset(playerNo);
        this.homeUser.setLevel(this.level(0));
        this.awayUser.setLevel(this.level(1));
    }
    
    update(delta) {         
        //if(Game.getInstance().gameMode == "single") {
            
        //} 
        this.homeUser.update(delta, this.ball);
        this.awayUser.update(delta, this.ball);
        if(Game.getInstance().gameState == "playing") {
            var dx = this.ball.dx;
            var dy = this.ball.dy;
            this.ball.update(delta, this.homeUser, this.awayUser);
            if(this.ball.left > Game.getInstance().appConfig.appWidth)
                this.goal(0);
            else if(this.ball.right < 0)
                this.goal(1);
        }
        
    }
    
    reset() {
        this.ball.x = 50;
        this.ball.y = 250;
        this.velocity = [4, 3];
        this.homeResult.text = Game.getInstance().scores[0];
        this.awayResult.text = Game.getInstance().scores[1];
    }
    
    setup() { 
            
        this.createRuler();
        this.createUserResults();
        this.createUsersAndBall();
        
        console.log("call setup() Play completed");   
    }
    
    createUserResults() {
        var app = Game.getInstance().getContext();
        
        var style = new PIXI.TextStyle({
            fontFamily: "Starcraft",
            fontSize: 36
        });
        
        this.homeResult = new PIXI.Text("0", style);
        this.homeResult.x = 300;
        this.homeResult.y = 20;
        
        this.awayResult = new PIXI.Text("0", style);
        this.awayResult.x = 500;
        this.awayResult.y = 20;
        
        app.stage.addChild(this.homeResult);
        app.stage.addChild(this.awayResult);
    }
    
    createUsersAndBall() {
        var app = Game.getInstance().getContext(); 
        
        //Add a ball
        //this.ball = PIXI.Sprite.fromImage("images/ball.png");
        this.ball = new Ball(Game.getInstance().appConfig.ballRes);
        this.ball.width = 24;
        this.ball.height = 24;
        //this.ball.x = 50;
        //this.ball.y = 250;
        
        //Add 2 users to the game
        //this.homeUser = PIXI.Sprite.fromImage("images/axe.png");
        this.homeUser = new Player(Game.getInstance().appConfig.leftPlayerRes);
        //this.homeUser.width = 48;
        //this.homeUser.height = 72;
        //this.homeUser.x = 0;
        //this.homeUser.y = 0;
        
        //this.awayUser = PIXI.Sprite.fromImage("images/axe.png");
        this.awayUser = new Player(Game.getInstance().appConfig.leftPlayerRes, true);
        /* this.awayUser.width = 48;
        this.awayUser.height = 72;
        this.awayUser.x = app._options.width - 48;
        this.awayUser.y = 0; */
        
        
        //
        this.homeUser.setAuto(1 < 1, this.level(0));
        this.awayUser.setAuto(1 < 2, this.level(1));
        this.ball.reset();
        
        //Add to game canvas
        app.stage.addChild(this.homeUser);
        app.stage.addChild(this.awayUser);
        app.stage.addChild(this.ball);
    }

    createRuler() {
        var stickWidth = 6;
        var stickHeight = 24;
        var rulerHeight = 500;
        var rulerHeightPadding = 10;
        var rulerPattern = Game.getInstance().appConfig.stickRes;
        var xOrigin = 398;
        var yOrigin = 0;
        
        //Calculate sum of sticks with rulerHeight
        var totalSticks = this.calculateSticks(rulerHeight, stickHeight + rulerHeightPadding);
        
        //Create sticks
        var app = Game.getInstance().getContext();
        for(var index = 0; index < totalSticks; ++index) {
            var stick = this.createStick(rulerPattern, stickWidth, stickHeight, xOrigin, (stickHeight + rulerHeightPadding) * index);
            this.lines.push(stick);
            app.stage.addChild(stick);
        }
        //console.log(totalSticks);
            
    }
    
    calculateSticks(rulerHeight, rulerHeightPadding) {
        return rulerHeight / rulerHeightPadding;
    }
    
    createStick(url, width, height, x, y) {
        var stick = PIXI.Sprite.fromImage(url);
        stick.width = width;
        stick.height = height;
        stick.x = x;
        stick.y = y;
        
        return stick;
    }  
}
