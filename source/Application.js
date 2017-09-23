class Application {
    constructor() { }
 
    setup() {
        var context = new PIXI.Application(800, 500, {backgroundColor : 0x1099bb});
        
        Game.getInstance().setContext(context);        
        document.getElementById("app_content").appendChild(context.view);
        
        //Active keyboard event to the canvas
        context.view.setAttribute("tabindex", "1");
        //Set focus to the canvas on load web page
        context.view.focus();
        
        //Handle keyboard event for the canvas
        context.view.onkeydown  = SceneManager.getInstance().onKeyDown;
        context.view.onkeyup    = SceneManager.getInstance().onKeyUp;  
    }
    
    run() {
        //Set up the game
        this.setup();
        //Call first game screen
        SceneManager.getInstance().setScene(new MainScreen());

        var app     = Game.getInstance().getContext();
        app.ticker.add(function(delta) {
            
            //console.log("ticker " + delta);
            SceneManager.getInstance().update(delta);
        });
        
    }
}

var app = new Application();
app.run();
