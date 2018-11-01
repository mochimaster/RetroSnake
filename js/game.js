// const Snake = require("./snake");
import Snake from './snake';
// const backgroundColor = 'rgb(156, 201, 44)';
// const objectColor = "rgb(56, 80, 12)";
// const canvas = document.getElementById("canvas");
// // ctx = canvas.getContext('2d');


class Game {
  constructor() {
    let x = 0;
    let snake1;

    this.drawBoard();
    this.snake1 = new Snake();
    this.draw();
  }

  addSnake(){
      const snake1 = new Snake()

      return snake1
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

  // Snake() {
  //     this.x = Math.floor(width / 2);
  //     this.y = Math.floor(width / 2);
  //     this.xspeed = 5;
  //     this.yspeed = 0;

  //     this.update = function () {
  //         this.x += this.xspeed;
  //         this.y += this.yspeed;
  //     }

  //     // this.show
  //     let snakeImage;
  //     this.drawSnake = function () {
  //         const canvas = document.getElementById("canvas");
  //         snakeImage = canvas.getContext("2d");

  //         snakeImage.fillStyle = objectColor;
  //         snakeImage.fillRect(this.x, this.y, 50, 5);
  //     }

  //     this.dead = function () {
  //         debugger
  //         if (this.x >= 500 || this.y >= 500) {
  //             return true
  //         } else {
  //             return false
  //         }
  //     }
  // }


  draw(ctx) {
    debugger;
    console.log("calling draw");
    this.drawBoard();

    this.snake1.updateLocation();
    this.snake1.drawSnake();
  }

  

  // game() {
  //     snake = new Snake();
  //     // change loop to while game !won
  //     console.log("calling draw")
  //     setInterval(draw, 500);
  // }
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