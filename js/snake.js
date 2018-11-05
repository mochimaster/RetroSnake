import Game from './game';
import Food from './food';

class Snake {
    constructor(game){
        this.board = game;

        // starting location
        this.x = Math.floor(game.WIDTH / 2);
        this.y = Math.floor(game.HEIGHT / 2);

        // move speed
        this.moveSpeed = 5;

        //  direction
        this.xspeed = 5;
        this.yspeed = 0;

        // live status
        this.dead = false;

        this.body= [[this.x, this.y]];
        this.score = 0;
        this.turning = false;

    }

    head(){
        return [this.body[0][0],this.body[0][1]]
    }

    updateLocation() {
        this.body.unshift([this.body[0][0]+this.xspeed, 
            this.body[0][1]+this.yspeed])

        if (this.eatFood()){
            this.body.unshift([this.body[0][0] + this.xspeed,
            this.body[0][1] + this.yspeed])
        } else {
            this.body.pop();
        }
        this.turning = false;
    }

    drawSnake() {
        const objectColor = "rgb(15, 22, 20)";

        const canvas = document.getElementById("canvas");
        let snakeImage = canvas.getContext("2d");

        snakeImage.fillStyle = objectColor;
        // snakeImage.fillRect(this.x, this.y, 5, 5);

        for(let i=0; i<this.body.length; i++){
            snakeImage.fillRect(this.body[i][0], this.body[i][1], 7, 7);
        }
    }

    drawScore(){
        const canvas = document.getElementById("canvas");
        let score = canvas.getContext("2d");
        score.fillStyle = this.board.OBJECTCOLOR;
        // score.font = "italic " + 20 + "pt Arial ";
        // score.font = 18 + "pt digital-clock-font";
        score.font = "17px trsMillion";
        score.fillText(this.score, 10, 20);
        
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

    checkDeath(){
        if (this.hitBorder() === true || this.hitSelf() === true){
            this.dead = true;
            return true
        } else {
            this.dead = false;
            return false
        }
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
                    return true
                }
        }
        return false
    }
    
    move(){
        //move snake forward
        this.drawSnake();
        this.drawScore();
        this.checkDeath();
        if(!this.dead){
            this.updateLocation();
            this.eatFood()
        }
    }

    cheat(){
        this.score += 10;
        this.body.unshift([this.body[0][0] + this.xspeed,
        this.body[0][1] + this.yspeed])
    }
}

export default Snake;