const numWide = 7;
const numHigh = 6;
let finished = false;
let twoAI = false;
let moves = [];

// get id of the <td> element based on the column and row
function boxId(col, row) {
    return "col" + col + "row" + row;
}

// create a 2d array based on the coloring of the html table 
function getBoard() {
    const board = [];
    for (let col=0; col<numWide; col++) {
        const column = [];
        for (let row=0; row<numHigh; row++) {
            const elem = document.getElementById(boxId(col,row));
            column.push(elem.style.background);
        }
        board.push(column);
    }
    return board;
}

// set is an array of boxes in a row
// winner checks the set of boxes and determines if it is a winning combination
// returns "none", "blue", or "red"
function winner(set) {
    const c = set[0];
    if (c == "white") return "none";
    let same = true;
    for (let i=1; same && i<set.length; i++) {
        if (c != set[i])
            same = false;
    }
    return same ? c : "none";    
}

function createEmptySet() {
    return ["white", "white", "white", "white"];
}

// "blue" = blue win
// "red" = red win
// "tie" = tie
// "incomplete" = incomplete game
function state(board) {
    let set;
    
    // check up and down sets
    for (let col=0; col<numWide; col++) {
        set = createEmptySet();
        for (let row=0; row<numHigh; row++) {
            set[row % 4] = board[col][row];
            const winningPlayer = winner(set);
            //console.log(winningPlayer);
            if (winningPlayer != "none") {
                return winningPlayer;
            }
        }
    }
    
    // check left and right sets
    for (let row=0; row<numHigh; row++) {
        set = createEmptySet();
        for (let col=0; col<numWide; col++) {
            set[col % 4] = board[col][row];
            const winningPlayer = winner(set);
            if (winningPlayer != "none")
                return winningPlayer;
        }
    }
    
    // check bottom left to top right sets
    for (let row=0; row<numHigh - 3; row++) {
        for (let col=0; col<numWide - 3; col++) {
            set = createEmptySet();
            for (let i=0; i<set.length; i++) {
                set[i] = board[col + i][row + i];
                const winningPlayer = winner(set);
                if (winningPlayer != "none")
                    return winningPlayer;
            }
        }
    }
    
    // check top left to bottom right sets
    for (let row=3; row<numHigh; row++) {
        for (let col=0; col<numWide - 3; col++) {
            set = createEmptySet();
            for (let i=0; i<set.length; i++) {
                set[i] = board[col + i][row - i];
                const winningPlayer = winner(set);
                if (winningPlayer != "none")
                    return winningPlayer;
            }
        }
    }
    
    // check if full
    let full = true;
    for (let col=0; full && col<numWide; col++) {
        for (let row=0; full && row<numHigh; row++) {
            if (board[col][row] == "white")
                full = false;
        }
    }
    if (full)
        return "tie";
    else
        return "incomplete";
}

function showState(state) {
    const elem = document.getElementById("gameState");
    finished = true;
    switch (state) {
        case "blue":
            elem.textContent = "Blue Wins!"
            elem.style.color = "blue";
            break;
        case "red":
            elem.textContent = "Red Wins!"
            elem.style.color = "red";
            break;
        case "tie":
            elem.textContent = "It's a tie!"
            elem.style.color = "pruple";
            break;
        default:
            finished = false;
    }
}

// Change AI mode
function changeAI() {
    twoAI = !twoAI;
    document.getElementById("changeAI").textContent = twoAI ? "Play Against AI" : "AI vs. AI";

    if (twoAI) {
        while (!finished) {
            if (!finished) placeBlueAI();
            if (!finished) placeRed();
        }
    }
}

// undo two moves
function undo() {
    if (moves.length > 1) {
        for (let i=0; i<2; i++) {
            const col = moves.pop();
            for (let row=numHigh-1; row>=0; row--) {
                const dataElem = document.getElementById(boxId(col, row));
                if (dataElem.style.background != "white") {
                    dataElem.style.background = "white";
                    break;
                }
            }
        }
    }

    document.getElementById("undo").disabled = (moves.length <= 1);
    document.getElementById("playRed").disabled = (moves.length > 0);
    document.getElementById("gameState").textContent = "";
    finished = false;
    //console.log(moves);
}

// check to see if a column is full
function columnFull(board, col) {
    return (board[col][numHigh-1] != "white");
}

// place a piece in column
function place(board, col, blue) {
    for (let row=0; row<numHigh; row++) {
        if (board[col][row] == "white") {
            board[col][row] = blue ? "blue" : "red";
            break;
        }
    }
}

// remove piece from column
function remove(board, col) {
    for (let row=numHigh-1; row>=0; row--) {
        if (board[col][row] != "white") {
            board[col][row] = "white";
            break;
        }
    }
}

// clear board
function clearBoard() {
    for (let row=0; row<numHigh; row++) {
        for (let col=0; col<numWide; col++) {
            const elem = document.getElementById(boxId(col, row));
            elem.style.background = "white";
        }
    }
    document.getElementById("playRed").disabled = false;
    document.getElementById("undo").disabled = true;
    document.getElementById("gameState").textContent = "";
    finished = false;
    moves = [];
    //console.log(moves);
}

// place blue piece
function placeBlue(board, col) {
    for (let row=0; row<numHigh; row++) {
        const elem = document.getElementById(boxId(col, row));
        if (elem.style.background == "white") {
            elem.style.background = "blue";
            break;
        }
    }
    board = getBoard();
    const currentState = state(board);
    showState(currentState);
    moves.push(col);
}

// place blue piece
function placeBlueAI() {
    let board = getBoard();
    const blueCol = minimaxBlue(board);
    for (let row=0; row<numHigh; row++) {
        const elem = document.getElementById(boxId(blueCol, row));
        if (elem.style.background == "white") {
            elem.style.background = "blue";
            break;
        }
    }
    board = getBoard();
    const currentState = state(board);
    showState(currentState);
    moves.push(blueCol);
    document.getElementById("playRed").disabled = true;
    document.getElementById("undo").disabled = false;
}

// place red piece
function placeRed() {
    let board = getBoard();
    console.log("red about to move");
    asyncMinimaxRed(board).then((col) => {
        console.log("red has moved ");
        for (let row=0; row<numHigh; row++) {
            const elem = document.getElementById(boxId(col, row));
            if (elem.style.background == "white") {
                elem.style.background = "red";
                break;
            }
        }
        const board = getBoard();
        const currentState = state(board);
        showState(currentState);
        moves.push(col);
        document.getElementById("playRed").disabled = true;
        document.getElementById("undo").disabled = false;
    });
}

// the function that occurs when the user clicks on a the column number 'col'
function click(col) {
    let board = getBoard();
    if (!columnFull(board, col)) {
        if (!finished) placeBlue(board, col);
        if (!finished) placeRed();
        //console.log(moves);
    }
}


