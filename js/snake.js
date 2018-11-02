import Game from './game';
import Food from './food';

class Snake {
    constructor(game){
        this.board = game;
        debugger
        
        // starting location
        this.x = Math.floor(Game.WIDTH / 2);
        this.y = Math.floor(Game.HEIGHT / 2);

        // speed and direction
        this.xspeed = 1;
        this.yspeed = 0;

        // length
        // this.length = 5;  

        // this.head = [this.x, this.y];
        this.body= [[this.x, this.y]];
        this.score = 0;

    }

    updateLocation() {
        // this.x += this.xspeed;
        // this.y += this.yspeed;

        // for(let i=0; i<this.body.length; i++){
        //     this.body[i][0] += this.xspeed
        //     this.body[i][1] += this.yspeed
        // }
        debugger
        this.body.unshift([this.body[0][0]+this.xspeed, 
            this.body[0][1]+this.yspeed])

        if (this.eatFood()){
            // this.body.unshift([this.body[0][0] + this.xspeed,
            // this.body[0][1] + this.yspeed])
        } else {
            this.body.pop();
        }
    }

    // this.show
    drawSnake() {
        // debugger
        const objectColor = "rgb(56, 80, 12)";

        const canvas = document.getElementById("canvas");
        let snakeImage = canvas.getContext("2d");

        snakeImage.fillStyle = objectColor;
        // snakeImage.fillRect(this.x, this.y, 5, 5);

        for(let i=0; i<this.body.length; i++){
            snakeImage.fillRect(this.body[i][0], this.body[i][1], 10, 10);
        }
    }

    drawScore(){
        const canvas = document.getElementById("canvas");
        let score = canvas.getContext("2d");
        score.fillStyle = "black";
        score.font = "italic " + 20 + "pt Arial ";
        score.fillText(this.score, 10, 25);
    }

    eatFood(){
        debugger
        if (Math.abs(this.body[0][0] - this.board.food.x) <=5 && 
            Math.abs(this.body[0][1] - this.board.food.y) <=5 ){
            console.log("ATE FOOD");
            debugger
            // this.body.push([this.board.food.x+this.xspeed, this.board.food.y+this.yspeed]);

            // this.body.push([this.body[this.body.length - 1][0]+(this.xspeed*5),
            //     this.body[this.body.length - 1][1] + (this.yspeed * 5)]);

            // this.body.unshift(this.board.food.x, this.board.food.y)

            this.board.food.generateFood();
            this.score += 10;



            // this.length += 5;
            return true
        } else {
            return false
        }
    }

    dead() {
        // debugger
        if (this.x >= 500-10 || this.y >= 500-10) {
            console.log("dead");
            return true
        } else {
            return false
        }
    }

    move(){
        //move snake forward
        this.drawSnake();
        this.drawScore();

        if(!this.dead()){
            this.updateLocation();
            this.eatFood()

        }

    }
}

// module.exports = Snake;
export default Snake;