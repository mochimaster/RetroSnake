import Game from './game';

class Food {
    constructor(game){
        this.generateFood();
        this.drawFood();
    }


    generateFood(){
        this.x = Math.floor(Math.random(1) * 500)
        this.y = Math.floor(Math.random(1) * 500)
    }

    drawFood(){

        const objectColor = "rgb(56, 80, 12)";

        const canvas = document.getElementById("canvas");
        let snakeImage = canvas.getContext("2d");

        snakeImage.fillStyle = objectColor;
        snakeImage.fillRect(this.x, this.y, 10, 10);

    }
}


export default Food;