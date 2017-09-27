class PlayScreen extends Scene {
    constructor(type = "play") {
        super(type);
        
        //Member Variables
        this.ball = null;
        this.lines = [];
        this.homeUser = null;
        this.awayUser = null;
        this.homeResult = null;
        this.awayResult = null;
        this.velocity = [4, 3];
        //Member Functions
        this.setup();
    }
    
    onKeyUp(event) { 
        if(event.keyCode == 27) {  //Esc
            console.log("PlayScreen Up");
            Game.getInstance().gameState = "pausing";
            this.saveState();
            SceneManager.getInstance().setScene(new PauseScreen());
        }
    }
    
    onKeyDown(event) {
        if(event.keyCode == 81) {         //Q
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
            this.awayUser.y += 30;
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
    
    update(delta) { 
        this.updateBallPosition(delta);
        this.checkCollisions();
        
        if(Game.getInstance().gameMode == "single") {
            if (this.awayUser.y < this.ball.y) {
                this.move(delta, 1);
            } else if (this.awayUser.y > this.ball.y) {
                this.move(delta, -1);
            }
        }    
    }
    
    updateBallPosition(delta) {
        this.ball.x += this.velocity[0] * delta;
        this.ball.y += this.velocity[1] * delta;
    }
    
    checkCollisions() {
        //Walls
        if(this.checkWallsCollision())
            return true;

        //Players
        if(this.checkPlayersCollision()) 
            return true;
        
        return false;        
    }
    
    checkWallsCollision() {
        if(this.ball.y < 0) {
            this.bounce(0, 1);
        } else if(this.ball.y > 500 - 24) {
            this.bounce(0, -1);
        } else if(this.ball.x < 0) {
            Game.getInstance().scores[1]++;
            this.reset();
        } else if(this.ball.x > 800 - 24) {
            Game.getInstance().scores[0]++;
            this.reset();
        } else return false;
    }
    
    checkPlayersCollision() {
        var homeRect = {left: this.homeUser.x, top: this.homeUser.y, right: this.homeUser.x + this.homeUser.width, bottom: this.homeUser.y + this.homeUser.height};
        var awayRect = {left: this.awayUser.x, top: this.awayUser.y, right: this.awayUser.x + this.awayUser.width, bottom: this.awayUser.y + this.awayUser.height};
        var ballRect = {left: this.ball.x, top: this.ball.y, right: this.ball.x + this.ball.width, bottom: this.ball.y + this.ball.height};

        if(this.intersectRect(ballRect, homeRect)) {
            this.bounce(1, 0);
            this.ball.x += 24;
        } else if(this.intersectRect(ballRect, awayRect)) {
            this.bounce(-1, 0);
            this.ball.x -= 12;
        }         
        return true;  
    }
    
    move(delta, direction) {
        var distance = delta * 4,
        stageHeight = 500,
        newY;

        newY = this.awayUser.y + distance * direction;

        if (newY > stageHeight / 2 - this.awayUser.height / 2) {
            newY = stageHeight / 2 - this.awayUser.height / 2;
        } else if (newY < -stageHeight / 2 + this.awayUser.height / 2) {
            newY = -stageHeight / 2 + this.awayUser.height / 2;
        }
        this.awayUser.y = newY;
    }
    
    bounce(mulX, mulY) {
        if(mulX)
            this.velocity[0] = Math.abs(this.velocity[0]) * mulX;
        if(mulY)
            this.velocity[1] = Math.abs(this.velocity[1]) * mulY;
    }
    
    intersectRect(r1, r2) {
        return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
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
        this.ball = new Ball();
        this.ball.width = 24;
        this.ball.height = 24;
        this.ball.x = 50;
        this.ball.y = 250;
        
        
        
        //Add 2 users to the game
        this.homeUser = PIXI.Sprite.fromImage("images/axe.png");
        this.homeUser.width = 48;
        this.homeUser.height = 72;
        this.homeUser.x = 0;
        this.homeUser.y = 0;
        
        this.awayUser = PIXI.Sprite.fromImage("images/axe.png");
        this.awayUser.width = 48;
        this.awayUser.height = 72;
        this.awayUser.x = app._options.width - 48;
        this.awayUser.y = 0;
        
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
        var rulerPattern = "images/stick.png";
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
