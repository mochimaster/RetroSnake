// const Game = require("./game");
import Game from './game'



document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("canvas");
    
    const game = new Game();


    // for(let i=0;i<1000;i++){
    while(!game.dead){
        setInterval(game.draw(), 1000);
    //     console.log(i)
    // }
    }
})