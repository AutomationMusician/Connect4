# Connect4

## How to play connect 4 on your computer
1. Clone or download this repository
1. Open index.html in a web browser
1. Click on a column to place a blue piece in that column (the AI will play red directly afterwards)
1. Continue to place pieces until the game has ended

## How it works
This game uses vanilla HTML, CSS, and JavaScript to run Connect 4 in your browser without having to run a server application. The JavaScript code uses a [minimax algorithm](https://en.wikipedia.org/wiki/Minimax) to calculate the AI's optimal move, based on the user's optimal move, based on the AI's optimal move, etc. until a maximum depth of search options are explored or until an optimal outcome is found. [Alpha-beta pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) is used to optimize the search process.
