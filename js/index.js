import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const game = new Game();
    document.addEventListener("keydown", game.handleKeyPress.bind(game));

    game.startAnimating(15);
})