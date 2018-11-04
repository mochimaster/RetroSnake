import Game from './game';

class Food {
    constructor(game){
        // debugger
        this.board = game;
        this.generateFood();
        this.drawFood();
    }


    generateFood(){
// (this.head()[0] >= this.board.WIDTH - this.board.BORDER*2 || this.head()[0] <= this.board.BORDER || 
//             this.head()[1] >= this.board.HEIGHT - this.board.BORDER*2 || this.head()[1] <= this.board.BORDER + this.board.TOPSCOREHEIGHT)
        
        // this.x = Math.floor(Math.random(1) * 500)
        // this.y = Math.floor(Math.random(1) * 500)
        // debugger
        this.x = Math.floor(Math.random() * (this.board.INNERRIGHT - this.board.INNERLEFT + 1)+ this.board.INNERLEFT);
        this.y = Math.floor(Math.random() * (this.board.INNERBOTTOM - this.board.INNERTOP + 1) + this.board.INNERTOP)
    }

    drawFood(){

        const objectColor = "rgb(15, 22, 20)";
        const backgroundColor = "rgb(156, 201, 44)";

        const canvas = document.getElementById("canvas");
        let food = canvas.getContext("2d");

        // food.fillStyle = objectColor;
        // food.fillRect(this.x, this.y, 10, 10);

        food.rect(this.x, this.y, 7,7);
        food.strokeStyle = objectColor;
        food.stroke();
        

    }
}


export default Food;