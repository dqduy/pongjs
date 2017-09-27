class Ball extends PIXI.Sprite {
    constructor(ballRes) {
        super();
        
        this.ballRes = ballRes;
        this.setup();
    }
    
    setup() {
        this.texture = PIXI.Texture.fromImage(this.ballRes);
        
        this.radius  = Game.getInstance().appConfig.ballRadius;
        this.minX    = this.radius;
        this.maxX    = Game.getInstance().appConfig.appWidth - this.radius;
        this.minY    = Game.getInstance().appConfig.wallWidth + this.radius;
        this.maxY    = Game.getInstance().appConfig.appHeight - Game.getInstance().appConfig.wallWidth - this.radius;
        this.speed   = (this.maxX - this.minX) / Game.getInstance().appConfig.ballSpeed;
        this.accel   = Game.getInstance().appConfig.ballAccel;
    }
    
    reset(playerNo) {
        this.setPosition(playerNo == 1 ?   this.maxX : this.minX,  Utils.random(this.minY, this.maxY));
        this.setDirection(playerNo == 1 ? -this.speed : this.speed, this.speed);       
    }
    
    setPosition(x, y) {
        this.x      = x;
        this.y      = y;
        this.left   = this.x - this.radius;
        this.top    = this.y - this.radius;
        this.right  = this.x + this.radius;
        this.bottom = this.y + this.radius;        
    }
    
    setDirection(dx, dy) {
        this.dx = dx;
        this.dy = dy;    
    }
    
    update(delta, leftPaddle, rightPaddle) {
        var pos = Utils.accelerate(this.x, this.y, this.dx, this.dy, this.accel, delta);

        if ((pos.dy > 0) && (pos.y > this.maxY)) {
            pos.y = this.maxY;
            pos.dy = -pos.dy;
        }
        else if ((pos.dy < 0) && (pos.y < this.minY)) {
            pos.y = this.minY;
            pos.dy = -pos.dy;
        }

        var paddle = (pos.dx < 0) ? leftPaddle : rightPaddle;
        var pt     = Utils.ballIntercept(this, paddle, pos.nx, pos.ny);

        if (pt) {
            switch(pt.d) {
            case 'left':
            case 'right':
                pos.x = pt.x;
                pos.dx = -pos.dx;
                break;
            case 'top':
            case 'bottom':
                pos.y = pt.y;
                pos.dy = -pos.dy;
                break;
        }

        // add/remove spin based on paddle direction
        if (paddle.up)
          pos.dy = pos.dy * (pos.dy < 0 ? 0.5 : 1.5);
        else if (paddle.down)
          pos.dy = pos.dy * (pos.dy > 0 ? 0.5 : 1.5);
      }

      this.setPosition(pos.x,  pos.y);
      this.setDirection(pos.dx, pos.dy);        
    }
    
}
