import Game from './game';

class Snake {
    constructor(){
        debugger
        
        // this.x = Math.floor(Game.width / 2);
        // this.y = Math.floor(Game.width / 2);
        this.x = Math.floor(500 / 2);
        this.y = Math.floor(500 / 2);
        this.xspeed = 5;
        this.yspeed = 0;
    }

    updateLocation() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    // this.show
    drawSnake() {
        const objectColor = "rgb(56, 80, 12)";

        const canvas = document.getElementById("canvas");
        let snakeImage = canvas.getContext("2d");

        snakeImage.fillStyle = objectColor;
        snakeImage.fillRect(this.x, this.y, 50, 5);
    }

    dead() {
        debugger
        if (this.x >= 500 || this.y >= 500) {
            return true
        } else {
            return false
        }
    }
}

// module.exports = Snake;
export default Snake;