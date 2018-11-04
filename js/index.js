// const Game = require("./game");
import Game from './game';
import GameView from './game_view';



document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    
    const game = new Game();
    // const ctx = canvas.getContext("2d");
    // document.body.style.backgroundImage = "url('background.jpg')";
    document.addEventListener("keydown", game.handleKeyPress.bind(game));

    // new GameView(game, ctx).start();

        
    // game.draw();
    game.draw();

    game. startAnimating(30);
    // game.start()

    // for(let i=0;i<1000;i++){
    // while(!game.dead){
    //     setInterval(game.draw(), 1000);
    //     console.log(i)
    // }
    // }
})