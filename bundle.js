/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/food.js":
/*!********************!*\
  !*** ./js/food.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Food);

/***/ }),

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _snake__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snake */ "./js/snake.js");
/* harmony import */ var _food__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./food */ "./js/food.js");



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
        this.snake = new _snake__WEBPACK_IMPORTED_MODULE_0__["default"](this);
        this.food = new _food__WEBPACK_IMPORTED_MODULE_1__["default"](this);
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
        const snake = new _snake__WEBPACK_IMPORTED_MODULE_0__["default"]();
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

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./js/game.js");


document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"]();
    document.addEventListener("keydown", game.handleKeyPress.bind(game));

    game.startAnimating(15);
})

/***/ }),

/***/ "./js/snake.js":
/*!*********************!*\
  !*** ./js/snake.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./js/game.js");
/* harmony import */ var _food__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./food */ "./js/food.js");



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

            this.board.food.generateFood();
            this.score += 10;
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
        if (this.head()[0] > this.board.WIDTH - this.board.BORDER*2 || 
            this.head()[0] < this.board.BORDER || 
            this.head()[1] > this.board.HEIGHT - this.board.BORDER*2 || 
            this.head()[1] < this.board.BORDER + this.board.TOPSCOREHEIGHT) {
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

/* harmony default export */ __webpack_exports__["default"] = (Snake);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map