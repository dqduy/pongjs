class SceneManager {
    constructor() {
        this.instance = null;
        this.currentScene = null;
    }
    
    static getInstance() {
        if(this.instance == null)
            this.instance = new SceneManager();
        return this.instance;
    }
    
    getCurrentScene() {
        return this.currentScene;
    }
    
    setScene(newScene) {
        if(this.currentScene)
            this.currentScene.destroy();
        
        this.currentScene = newScene;
        
        if(Game.getInstance().gameState == "pausing" && this.currentScene.type == "play") {
            this.currentScene.resume();
            Game.getInstance().gameState == "playing";
        }
    }
    
    update(delta) {
        this.currentScene.update(delta);
    }
    
    onKeyDown(event) {
        //console.log("Down - " + event.keyCode);
        SceneManager.getInstance().getCurrentScene().onKeyDown(event);
    }
    
    onKeyUp(event) {
        //console.log("Up - " + event.keyCode);
        SceneManager.getInstance().getCurrentScene().onKeyUp(event);
    }
}
