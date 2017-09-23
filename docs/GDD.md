                                PONG GAME
================================================================================
1. Game Screen
Main Screen: Show Play button (Arrow Up, Arrow Down)
Play Screen: Gameplay (Arrow Up, Arrow Down, Esc)
Pause Screen: Show Back to game button, Restart button game
================================================================================
Input type
Keyboard
    - Esc (27)
    - Enter (13)
    - Arrow Up (38)
    - Arrow Down (40)
    - Q (81)
    - A (65)
    - P (80)
    - L (76)
Mouse: Not supported;

================================================================================
2. Project structure 
    root 
        |- docs:
        |- output: release game
            |- index.html
            |- images
            |- css
            |- js
                |- Game.js
                |- pixi.js
        |- res: game resources
            |- texture
            |- css
            |- font
            |- libs
        |- scripts: make script
        |- source: js
            |- engine
            |- scene
        |- tools: helper script
================================================================================
Note:
1. Write make file for game
2. Write a mini game engine for Input, Graphics, SceneManager, Object Manager
3. Write full layout for the game (html side + game side)
 In Firefox, the keyCode property does not work on the onkeypress event (will only return 0). For a cross-browser solution, use the which property together with keyCode
