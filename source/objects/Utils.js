class Utils {
    constructor() {
        
    }
    
    static accelerate(x, y, dx, dy, accel, dt) {
      var x2  = x + (dt * dx) + (accel * dt * dt * 0.5);
      var y2  = y + (dt * dy) + (accel * dt * dt * 0.5);
      var dx2 = dx + (accel * dt) * (dx > 0 ? 1 : -1);
      var dy2 = dy + (accel * dt) * (dy > 0 ? 1 : -1);
      return { nx: (x2-x), ny: (y2-y), x: x2, y: y2, dx: dx2, dy: dy2 };      
    }
    
    static intercept(x1, y1, x2, y2, x3, y3, x4, y4, d) {
        var denom = ((y4-y3) * (x2-x1)) - ((x4-x3) * (y2-y1));
        if (denom != 0) {
            var ua = (((x4-x3) * (y1-y3)) - ((y4-y3) * (x1-x3))) / denom;
            if ((ua >= 0) && (ua <= 1)) {
                var ub = (((x2-x1) * (y1-y3)) - ((y2-y1) * (x1-x3))) / denom;
                if ((ub >= 0) && (ub <= 1)) {
                    var x = x1 + (ua * (x2-x1));
                    var y = y1 + (ua * (y2-y1));
                    return { x: x, y: y, d: d};
                }
            }
        }
        return null;
    }
    
    static ballIntercept(ball, rect, nx, ny) {
        var pt;
        if (nx < 0) {
            pt = Utils.intercept(ball.x, ball.y, ball.x + nx, ball.y + ny, 
                                   rect.right  + ball.radius, 
                                   rect.top    - ball.radius, 
                                   rect.right  + ball.radius, 
                                   rect.bottom + ball.radius, 
                                   "right");
        }
        else if (nx > 0) {
            pt = Utils.intercept(ball.x, ball.y, ball.x + nx, ball.y + ny, 
                                   rect.left   - ball.radius, 
                                   rect.top    - ball.radius, 
                                   rect.left   - ball.radius, 
                                   rect.bottom + ball.radius,
                                   "left");
        }
        if (!pt) {
            if (ny < 0) {
            pt = Utils.intercept(ball.x, ball.y, ball.x + nx, ball.y + ny, 
                                     rect.left   - ball.radius, 
                                     rect.bottom + ball.radius, 
                                     rect.right  + ball.radius, 
                                     rect.bottom + ball.radius,
                                     "bottom");
            }
            else if (ny > 0) {
            pt = Utils.intercept(ball.x, ball.y, ball.x + nx, ball.y + ny, 
                                     rect.left   - ball.radius, 
                                     rect.top    - ball.radius, 
                                     rect.right  + ball.radius, 
                                     rect.top    - ball.radius,
                                     "top");
            }
        }
      return pt;        
    }
    
}
