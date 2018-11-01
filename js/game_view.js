class GameView{
    constructor(game, ctx){
        this.ctx = ctx;
        this.game = game;
        this.snake = this.game.addSnake();
    }
}