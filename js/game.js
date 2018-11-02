// const Snake = require("./snake");
import Snake from './snake';
import Food from './food';
// const backgroundColor = 'rgb(156, 201, 44)';
// const objectColor = "rgb(56, 80, 12)";
// const canvas = document.getElementById("canvas");
// // ctx = canvas.getContext('2d');

// shim layer with setTimeout fallback 
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


class Game {
    constructor() {
        // debugger
        let x = 0;
        let snake;

        this.drawBoard();
        this.snake = new Snake(this);
        this.food = new Food(this);
        this.draw();
        // document.addEventListener("keydown", this.handleKeyPress);

    }

    addSnake() {
        const snake = new Snake();
        return snake;
    }

    drawBoard() {
        // let particles = [];
        // let tick = 0;

        // get a reference to the drawing context
        // size of board
        // let width = 500;
        // let height = 500;

        const canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        const backgroundColor = "rgb(156, 201, 44)";
        const objectColor = "rgb(56, 80, 12)";
        let width = 500;
        let height = 500;

        let topScoreHeight = 25;
        let border = 10;

        // draw background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);

        // draw top bar to contain score
        ctx.beginPath();
        ctx.moveTo(border, topScoreHeight);
        ctx.lineTo(width - border, topScoreHeight);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = objectColor;
        ctx.lineWidth = 5;
        ctx.stroke();

        // draw border
        // taking into account that border draws in the middle
        ctx.strokeRect(
        border,
        topScoreHeight + 10,
        width - border * 2,
        height - border * 2 - topScoreHeight
        );
    }

    draw() {
        // debugger;
        window.requestAnimFrame(this.draw.bind(this));
        
        this.drawBoard();
        this.food.drawFood();

        this.snake.move();

        // if (!this.snake.dead()){
        //     this.snake.updateLocation();
        //     this.snake.drawSnake();
        // } else {
        //     console.log("dead");
            
        // }
    }

    handleKeyPress(event){
        // debugger
        // this.xspeed = 1;
        // this.yspeed = 0;
        if(!event) {return}
        if(event.keyCode === 37 ){
            console.log("PRESSED LEFT")
            this.snake.xspeed = -1
            this.snake.yspeed = 0;

        }
        else if(event.keyCode === 38 ){
            console.log("PRESSED UP")
            this.snake.xspeed = 0
            this.snake.yspeed = -1;
        }
        else if(event.keyCode === 39 ){
            console.log("PRESSED RIGHT")
            this.snake.xspeed = 1
            this.snake.yspeed = 0;

        }
        else if(event.keyCode === 40 ){
            console.log("PRESSED DOWN")
            this.snake.xspeed = 0
            this.snake.yspeed = 1;
        }
    }

}

// module.exports = Game;
Game.WIDTH = 500;
Game.HEIGHT = 500;
export default Game;


// window.requestAnimFrame = (function() {
//   return (
//     window.requestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     window.mozRequestAnimationFrame ||
//     window.oRequestAnimationFrame ||
//     window.msRequestAnimationFrame ||
//     function(callback) {
//       window.setTimeout(callback, 1000 / 60);
//     }
//   );
// })();



// calculate elapsed time
// https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
// let stop = false;
// let frameCount = 0
// let fps, fpsInterval, startTime, now, then, elapsed;

// function startAnimation(fps) {
//     fpsInterval = 1000 / fps;
//     then = Date.now();
//     startTime = then;
//     this.draw();
// }



// function draw(){
//     drawBoard();
//     // window.requestAnimFrame(drawIt);
//     // request another frame
//     window.requestAnimFrame(draw);
//     const canvas = document.getElementById("canvas");
//     snake = canvas.getContext("2d");

//     // calc elapsed time since last loop
//     now = Date.now();
//     elapsed = now - then;

//     // if elapsed time has passed, draw next frame
//     if(elapsed > fpsInterval) {
//         then = now - (elapsed % fpsInterval)

//         snake.fillStyle = objectColor;
//         debugger
//         snake.fillRect(this.x+this.xspeed, this.y+this.yspeed, 50, 5);

//     }
// }