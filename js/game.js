import Snake from './snake';
import Food from './food';

// shim layer with setTimeout fallback 
// calculate elapsed time
// https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe

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
        // GAME START
        let x = 0;
        let snake;

        // GAME DESIGN
        this.OBJECTCOLOR = "rgb(30,27,28)";
        this.WIDTH = 320;
        this.HEIGHT = 240;
        this.BORDER = 10;
        this.TOPSCOREHEIGHT = 25;
        this.INNERRIGHT = this.WIDTH - this.BORDER * 2;
        this.INNERLEFT = this.BORDER;
        this.INNERBOTTOM = this.HEIGHT - this.BORDER * 2;
        this.INNERTOP = this.BORDER + this.TOPSCOREHEIGHT;

        //GAME STATUS
        this.STARTED = false;
        this.PAUSED = false;

        // GAME START
        this.drawBoard();
        this.snake = new Snake(this);
        this.food = new Food(this);
        this.draw();
        this.sessionHighScore = 0;


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

    draw() {
        // request another frame
        window.requestAnimFrame(this.draw.bind(this));

        // calculate elapsed time since last loop
        this.now = Date.now();
        this.elapsed = this.now - this.then;

        // if enough time has elapsed, draw the next frame
        if (this.elapsed > this.fpsInterval) {
            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            this.then = this.now - (this.elapsed % this.fpsInterval);
            this.drawBoard();
            this.drawHighScore();
            // start game
            if (this.STARTED === true && this.PAUSED === false && this.over() === false){
                this.food.drawFood();
                this.snake.move();
            } else {
                // pause game
                if(this.STARTED === true && this.PAUSED === true && this.over() === false){
                    this.drawPause();

                // if game over
                } else if(this.snake.checkDeath()){
                    this.drawHighScore();
                    this.drawGameOver();
                    this.recordSessionHighScore();
                
                //unpause game
                } else {
                    this.drawMenu();
                }
            }

        }
    }

    restart(){
        this.food.generateFood();
        this.snake.xspeed = this.snake.moveSpeed ;
        this.snake.yspeed = 0;
        this.snake.body = [[this.WIDTH / 2, this.HEIGHT / 2]];
        if (this.snake.score > this.sessionHighScore) {
            this.sessionHighScore = this.snake.score; // SET HIGH SCORE
        }
        this.snake.score = 0;
    }

    addSnake() {
        const snake = new Snake();
        return snake;
    }

    drawBoard() {
        const canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        // const backgroundColor = "rgb(156, 201, 44)";
        const backgroundColor = "rgb(97, 159, 116)";

        // draw background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

        // draw top bar to contain score
        ctx.beginPath();
        ctx.moveTo(this.BORDER, this.TOPSCOREHEIGHT);
        ctx.lineTo(this.WIDTH - this.BORDER, this.TOPSCOREHEIGHT);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = this.OBJECTCOLOR;
        ctx.lineWidth = 4;
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

    drawMenu(){

        let menu = canvas.getContext("2d");
        const menuHeight = 60;
        const fontSize = 15;
        const xcoordinate = 15;

        menu.fillStyle = this.OBJECTCOLOR;
        // menu.font = "18px Lobster";
        menu.font = "23px trsMillion";
        menu.fillText("Welcome to RetroSnake", 25, menuHeight+10);
        menu.font = "15px trsMillion";
        menu.fillText("- Press enter key to start new game", xcoordinate, menuHeight+70);
        menu.fillText("- Use arrow keys to control snake", xcoordinate, menuHeight+90);
        menu.fillText("- Press esc key to pause game", xcoordinate, menuHeight+110);
    }

    drawGameOver(){
        const canvas = document.getElementById("canvas");
        let score = canvas.getContext("2d");
        score.fillStyle = this.OBJECTCOLOR;
        // score.font = "italic " + 20 + "pt Arial ";
        score.font = "23px trsMillion ";
        score.fillText("GAME OVER", this.WIDTH / 2 - 60, this.HEIGHT / 2 - 40);

        score.font = "15px trsMillion ";
        score.fillText("Your score : "+this.snake.score, this.WIDTH / 2 - 60, this.HEIGHT / 2 + 30);

        score.font = "15px trsMillion ";
        score.fillText("Press enter for a new game", 60, this.HEIGHT / 2 + 50);
    }

    drawHighScore(){
        // if(this.sessionHighScore>0){
        let score = canvas.getContext("2d");
        score.fillStyle = this.OBJECTCOLOR;
        // score.font = "italic " + 20 + "pt Arial ";
        score.font = "17px trsMillion ";
        score.fillText("HIGH SCORE : "+this.sessionHighScore, this.WIDTH / 2 + 15, this.TOPSCOREHEIGHT - 5);
        // }
    }

    recordSessionHighScore(){
        // draw congratulations and record high score
        if (this.snake.score > this.sessionHighScore) {

            const canvas = document.getElementById("canvas");
            let score = canvas.getContext("2d");
            score.fillStyle = this.OBJECTCOLOR;
            score.font = "15px trsMillion ";
            score.fillText("CONGRATULATIONS! NEW HIGH SCORE", 45, this.HEIGHT / 2 + 10);
        }
    }

    drawPause(){
        const menuHeight = 60;
        const xcoordinate = 15;
        let pause = canvas.getContext("2d");
        pause.fillStyle = this.OBJECTCOLOR;
        pause.font = "23px trsMillion";
        pause.fillText("PAUSED", xcoordinate+100, menuHeight+10);
        pause.font = "15 trsMillion";
        pause.fillText("Press esc to continue", xcoordinate+22, menuHeight + 110);
    }

    over(){
        if(this.snake.checkDeath()){
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

    handleKeyPress(event){
        let moveSpeed = 5;
        
        if(!event) {return}
        if (event.keyCode === 37 && this.snake.xspeed <= 0 && this.snake.turning === false){
            // console.log("PRESSED LEFT")
            this.snake.xspeed = moveSpeed * -1;
            this.snake.yspeed = 0;
            this.snake.turning = true;
        }
        else if (event.keyCode === 38 && this.snake.yspeed <= 0 && this.snake.turning === false){
            // console.log("PRESSED UP")
            this.snake.xspeed = 0
            this.snake.yspeed = moveSpeed * -1;
            this.snake.turning = true;
        }
        else if (event.keyCode === 39 && this.snake.xspeed >= 0 && this.snake.turning === false){
            // console.log("PRESSED RIGHT")
            this.snake.xspeed = moveSpeed;
            this.snake.yspeed = 0;
            this.snake.turning = true;
        }
        else if (event.keyCode === 40 && this.snake.yspeed >= 0 && this.snake.turning === false) {
            //    console.log("PRESSED DOWN");
               this.snake.xspeed = 0;
               this.snake.yspeed = moveSpeed;
               this.snake.turning = true;
             } 
        else if (event.keyCode === 27) {
            //    console.log("PRESSED ESC");
            this.PAUSED = !this.PAUSED;
        }

        else if (event.keyCode === 13){
            // console.log("PRESSED ENTER");

            // do nothing if game is paused
            if(this.PAUSED === true){
                return nil;
            }

            this.STARTED = true;
            this.PAUSED = false;
            if(this.over() === true){
                this.restart();
            } 
        }

        else if (event.keyCode === 67){
            this.snake.cheat();
        }
    }
}

export default Game;