const numWide = 7;
const numHigh = 6;
let blue = true;

function boxId(col, row) {
    return "col" + col + "row" + row;
}

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

// "blue" = blue win
// "red" = red win
// "tie" = tie
// "incomplete" = incomplete game
function state(board) {
    let set;
    
    // check up and down sets
    for (let col=0; col<numWide; col++) {
        set = [];
        for (let row=0; row<numHigh; row++) {
            set[row % 4] = board[col][row];
            const winner = winner(set);
            if (winner != "none") {
                return winner;
            }
        }
    }
    
    // check left and right sets
    for (let row=0; row<numHigh; row++) {
        set = [];
        for (let col=0; col<numWide; col++) {
            set[col % 4] = board[col][row];
            const winner = winner(set);
            if (winner != "none")
                return winner;
        }
    }
    
    // check bottom left to top right sets
    for (let row=0; row<numHigh - 3; row++) {
        for (let col=0; col<numWide - 3; col++) {
            set = [];
            for (let i=0; i<4; i++) {
                set[i] = board[col + i][row + i];
                const winner = winner(set);
                if (winner != "none")
                    return winner;
            }
        }
    }
    
    // check top left to bottom right sets
    for (let row=3; row<numHigh; row++) {
        for (let col=0; col<numWide - 3; col++) {
            set = [];
            for (let i=0; i<4; i++) {
                set[i] = board[col + i][row - i];
                const winner = winner(set);
                if (winner != "none")
                    return winner;
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

function click(col) {
    for (let row=0; row<numHigh; row++) {
        const elem = document.getElementById(boxId(col, row));
        if (elem.style.background == "white") {
            elem.style.background = blue ? "blue" : "red";
            blue = !blue;
            break;
        }
    }
    const board = getBoard();
    console.log(state(board));
}