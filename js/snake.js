import Game from './game';
import Food from './food';

class Snake {
    constructor(game){
        this.board = game;

        
        // starting location
        this.x = Math.floor(game.WIDTH / 2);
        this.y = Math.floor(game.HEIGHT / 2);

        // speed and direction
        this.xspeed = 5;
        this.yspeed = 0;



        // length
        // this.length = 5;  

        // this.head = [this.x, this.y];
        this.body= [[this.x, this.y]];
        this.score = 0;

    }

    head(){
        return [this.body[0][0],this.body[0][1]]
    }

    updateLocation() {
        // this.x += this.xspeed;
        // this.y += this.yspeed;

        // for(let i=0; i<this.body.length; i++){
        //     this.body[i][0] += this.xspeed
        //     this.body[i][1] += this.yspeed
        // }

        this.body.unshift([this.body[0][0]+this.xspeed, 
            this.body[0][1]+this.yspeed])

        if (this.eatFood()){
            this.body.unshift([this.body[0][0] + this.xspeed,
            this.body[0][1] + this.yspeed])
        } else {
            this.body.pop();
        }
    }

    // this.show
    drawSnake() {
        // debugger
        const objectColor = "rgb(15, 22, 20)";

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
        // score.font = "italic " + 20 + "pt Arial ";
        // score.font = 18 + "pt digital-clock-font";
        score.font = "18px Lobster";
        score.fillText(this.score, 10, 22);
        
    }

    eatFood(){

        if (Math.abs(this.body[0][0] - this.board.food.x) <=5 && 
            Math.abs(this.body[0][1] - this.board.food.y) <=5 ){
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

    dead(){
        if (this.hitBorder() === true || this.hitSelf() === true){
            return true
        } else {
            return false
        }
        // if (this.x >= Game.WIDTH- Game.BORDER || this.y >= Game.HEIGHT- Game.BORDER) {
        //     console.log("dead");
        //     return true
        // } else {
        //     return false
        // }
    }

    hitBorder(){
        if (this.head()[0] > this.board.WIDTH - this.board.BORDER*2 || this.head()[0] < this.board.BORDER || 
            this.head()[1] > this.board.HEIGHT - this.board.BORDER*2 || this.head()[1] < this.board.BORDER + this.board.TOPSCOREHEIGHT) {
            return true
        } else {
            return false
        }
    }

    hitSelf(){
        for(let i=1; i<this.body.length; i++){
            if (this.body[0][0] === this.body[i][0] &&
                this.body[0][1] === this.body[i][1]){
                    debugger
                    return true
                }
        }
        return false
    }
    

    move(){
        //move snake forward
        this.drawSnake();
        this.drawScore();

        if(!this.dead()){
            this.updateLocation();
            this.eatFood()

        } else {
            const canvas = document.getElementById("canvas");
            let score = canvas.getContext("2d");
            score.fillStyle = "black";
            score.font = "italic " + 20 + "pt Arial ";
            score.fillText("DEAD", this.board.WIDTH/2-50, 25);
        }

    }
}

// module.exports = Snake;
export default Snake;