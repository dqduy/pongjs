class Player extends PIXI.Sprite { 
    constructor(playerRes, rhs = false) {
        super();
        
        this.playerRes = playerRes;
        this.rhs = rhs;             //Right-hand side
        this.setup();
    }
    
    setup() {
        this.texture = PIXI.Texture.fromImage(this.playerRes);
        
        this.width  = Game.getInstance().appConfig.paddleWidth;
        this.height = Game.getInstance().appConfig.paddleHeight;
        this.minY   = Game.getInstance().appConfig.wallWidth;
        this.maxY   = Game.getInstance().appConfig.appHeight - Game.getInstance().appConfig.wallWidth - this.height;
        this.speed  = (this.maxY - this.minY) / Game.getInstance().appConfig.paddleSpeed;
        this.setPosition(this.rhs ? Game.getInstance().appConfig.wallWidth - this.width : 0, this.minY + (this.maxY - this.minY)/2);
        this.setDirection(0);
    }
    
    setPosition(x, y) {
        this.x      = x;
        this.y      = y;
        this.left   = this.x;
        this.right  = this.left + this.width;
        this.top    = this.y;
        this.bottom = this.y + this.height;    
    }
    
    setDirection(dy) {
        this.up   = (dy < 0 ? -dy : 0);
        this.down = (dy > 0 ?  dy : 0);
    }
    
    setAuto(on, level) {
        if (on && !this.auto) {
            this.auto = true;
            this.setLevel(level);
        }
        else if (!on && this.auto) {
            this.auto = false;
            this.setDirection(0);       
        }
    }
    
    setLevel(level) {
        if (this.auto)
            this.level = Game.getInstance().appConfig.levels[level];
    }
    
    ai(dt, ball) {
        if (((ball.x < this.left) && (ball.dx < 0)) ||
            ((ball.x > this.right) && (ball.dx > 0))) {
            this.stopMovingUp();
            this.stopMovingDown();
            return;
        }

        this.predict(ball, dt);

        if (this.prediction) {
            if (this.prediction.y < (this.top + this.height/2 - 5)) {
              this.stopMovingDown();
              this.moveUp();
            }
            else if (this.prediction.y > (this.bottom - this.height/2 + 5)) {
                this.stopMovingUp();
                this.moveDown();
            }
        else {
          this.stopMovingUp();
          this.stopMovingDown();
        }
        }            
    }
    
    predict(ball, dt) {
        if (this.prediction &&
          ((this.prediction.dx * ball.dx) > 0) &&
          ((this.prediction.dy * ball.dy) > 0) &&
          (this.prediction.since < this.level.aiReaction)) {
            this.prediction.since += dt;
            return;
      }

        var pt  = Utils.ballIntercept(ball, {left: this.left, right: this.right, top: -10000, bottom: 10000}, ball.dx * 10, ball.dy * 10);
        if (pt) {
            var t = this.minY + ball.radius;
            var b = this.maxY + this.height - ball.radius;

            while ((pt.y < t) || (pt.y > b)) {
              if (pt.y < t) {
                pt.y = t + (t - pt.y);
              }
              else if (pt.y > b) {
                pt.y = t + (b - t) - (pt.y - b);
              }
            }
            this.prediction = pt;
        }
        else {
            this.prediction = null;
        }

        if (this.prediction) {
            this.prediction.since = 0;
            this.prediction.dx = ball.dx;
            this.prediction.dy = ball.dy;
            this.prediction.radius = ball.radius;
            this.prediction.exactX = this.prediction.x;
            this.prediction.exactY = this.prediction.y;
            var closeness = (ball.dx < 0 ? ball.x - this.right : this.left - ball.x) / Game.getInstance().appConfig.appWidth;
            var error = this.level.aiError * closeness;
            this.prediction.y = this.prediction.y + Utils.random(-error, error);
        }        
    }
    
    moveUp() {
        this.up = 1;
    }
    
    moveDown() {
        this.down = 1;
    }
    
    stopMovingUp() {
        this.up = 0;
    }
    
    stopMovingDown() {
        this.down = 0;
    }
    
    update(delta, ball) {
        if (this.auto)
            this.ai(delta, ball);

        var amount = this.down - this.up;
        if (amount != 0) {
            var y = this.y + (amount * delta * this.speed);
        if (y < this.minY)
            y = this.minY;
        else if (y > this.maxY)
            y = this.maxY;
            this.setPosition(this.x, y);
        }
    } 
}
