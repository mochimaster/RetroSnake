# Retro Snake

## Background and Overview

Growing up in the 90s, I  enjoyed a wide variety of console and mobile games. The game that I remember fondly is the Snake game from Nokia handsets. 

This project is to bring the retro game back and reminisce the glory of dot matrix games. The game's goal is to navigate the snake to consume as many black dots as possible. The ultimate challenege is to fill each and every pixel of the screen with black dots.
    
## Functionality and MVP Features

  * Game starts with a board, snake, and a dot generated
  * Game board is encompassed within a 90s cellphone to simulate a dot matrix screen
  * Snake length increase by colliding snake head with dot
  * Game is over if snake head collides with game border
  * Game records high score
  * Game can be restarted
  * Game is controlled by keyboard input

### Game Design 

  * Game has a predetermined board size.
  * Snake starts off with a length of 3
  * Snake length is stored in an array
  * Game start with a randomly generated dot on the board that does not collide with snake 
  * If snake head collides with dot, snake length increase by 1
  * If snake head collides with self body, game is over
  * If snake head collides with game board border, game is over
  * Score is calculated based on length of snake

* Architecture and Technologies
    * Technology 1
        * Description
        * Justification
    * Technology 2
        * Description
        * Justification
    ...
Implementation Timeline
    * Most important category
    * Daily breakdown
    * Aim to be done by Friday
    
# Bonus
  * Phone simulation can be changed based on user select
  * Snake speed can be increased
  * Screen can be colorized based on user select
  * Use phone button to control menu to start game
  * Game can be paused with keyboard esc key
  * Game can be resumed with keyboard return key
