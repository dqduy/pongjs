class Game {
    constructor() {
        this.instance = null;
        this.context = null;
        this.appConfig = null;
        
        this.winPoint = 4;
        this.scores = [0, 0];
        this.gameState = "playing"; //playing, pausing
        this.gameMode = "single";   //single, multi
        
        this.savedBundle = {};
    }
    
    static getInstance() {
        if(this.instance == null)
            this.instance = new Game();
        return this.instance;
    }    
    
    init(context, config) {
        this.context = context;
        this.appConfig = config;
    }
    
    setContext(context) {
        
    }
    
    getContext() {
        return this.context;
    }
    
    reset() {
        this.scores = [0, 0];
        this.gameState = "playing";
        this.gameMode = "single";
    }
}
