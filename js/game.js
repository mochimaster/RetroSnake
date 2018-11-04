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

        this.WIDTH = 500;
        this.HEIGHT = 500;
        this.BORDER = 10;
        this.TOPSCOREHEIGHT = 25;
        this.INNERRIGHT = this.WIDTH - this.BORDER * 2;
        this.INNERLEFT = this.BORDER;
        this.INNERBOTTOM = this.HEIGHT - this.BORDER * 2;
        this.INNERTOP = this.BORDER + this.TOPSCOREHEIGHT;

        this.drawBoard();
        this.snake = new Snake(this);
        this.food = new Food(this);
        this.draw();
        // document.addEventListener("keydown", this.handleKeyPress);


        // fps control
        this.stop = false;
        this.frameCount = 0;
        this.fps;
        this.fpsInterval;
        this.startTime;
        this.now;
        this.then;
        this.elapsed;

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
        // const backgroundColor = "rgb(156, 201, 44)";
        const backgroundColor = "rgb(97, 159, 116)";
        // const objectColor = "rgb(56, 80, 12)";
        const objectColor = "rgb(15, 22, 20)";
        // let width = 500;
        // let height = 500;

        // let TOPSCOREHEIGHT = 25;
        // let border = 10;

        // draw background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

        // draw top bar to contain score
        ctx.beginPath();
        ctx.moveTo(this.BORDER, this.TOPSCOREHEIGHT);
        ctx.lineTo(this.WIDTH - this.BORDER, this.TOPSCOREHEIGHT);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = objectColor;
        ctx.lineWidth = 5;
        ctx.stroke();

        // draw border
        // taking into account that border draws in the middle
        ctx.strokeRect(
        this.BORDER,
        this.TOPSCOREHEIGHT + 10,
        this.WIDTH - this.BORDER * 2,
        this.HEIGHT - this.BORDER * 2 - this.TOPSCOREHEIGHT
        );
    }

    over(){
        if(this.snake.dead){
            return true
        } else {
            return false
        }
    }

    start(){
        while(!this.over()){
            this.snake.move()
        }
        window.alert("Game over.");

    }

    startAnimating(fps) {
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
        this.startTime = this.then;
        this.draw();
    }

    draw() {
        // debugger;
        // request another frame
        window.requestAnimFrame(this.draw.bind(this));

        // calculate elapsed time since last loop
        this.now = Date.now();
        this.elapsed = this.now - this.then;

        // if enough time has elapsed, draw the next frame
            
        if (this.elapsed > this.fpsInterval){

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)

            this.then = this.now - (this.elapsed % this.fpsInterval);

            this.drawBoard();
            this.food.drawFood();
            this.snake.move();

        }
     

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
        let moveSpeed = 5;

        if(!event) {return}
        if(event.keyCode === 37 && this.snake.xspeed <= 0){
            // debugger
            console.log("PRESSED LEFT")
            this.snake.xspeed = moveSpeed * -1;
            this.snake.yspeed = 0;
        }
        else if (event.keyCode === 38 && this.snake.yspeed <= 0 ){
            console.log("PRESSED UP")
            this.snake.xspeed = 0
            this.snake.yspeed = moveSpeed * -1;
        }
        else if(event.keyCode === 39 && this.snake.xspeed >= 0){
            console.log("PRESSED RIGHT")
            this.snake.xspeed = moveSpeed;
            this.snake.yspeed = 0;

        }
        else if (event.keyCode === 40 && this.snake.yspeed >= 0){
            console.log("PRESSED DOWN")
            this.snake.xspeed = 0
            this.snake.yspeed = moveSpeed;
        }
    }

}

// module.exports = Game;

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