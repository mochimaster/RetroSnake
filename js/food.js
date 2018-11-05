class Food {
    constructor(game){
        this.board = game;
        this.generateFood();
        this.drawFood();
        this.body = this.board.snake.body;
    }

    generateFood(){
        this.x = Math.floor(Math.random() * (this.board.INNERRIGHT - 
            this.board.INNERLEFT + 3) + this.board.INNERLEFT +3 ); // -3 for half of border lineWidth
        this.y = Math.floor(Math.random() * (this.board.INNERBOTTOM - 
            this.board.INNERTOP + 3) + this.board.INNERTOP +3 )

        for (let i = 0; i < this.board.snake.body.length; i++) {
            if (this.board.snake.body[i][0] === this.x &&
                this.board.snake.body[i][1] === this.y) {
                    this.generateFood()
                }
        }
    }

    drawFood(){
        const objectColor = "rgb(15, 22, 20)";
        const backgroundColor = "rgb(156, 201, 44)";

        const canvas = document.getElementById("canvas");
        let food = canvas.getContext("2d");

        food.rect(this.x, this.y, 2,2);
        food.strokeStyle = objectColor;
        food.stroke();
    }
}

export default Food;