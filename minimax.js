const maxDepth = 8 ;

function minimaxHelper(board) {
    let value = Number.POSITIVE_INFINITY;
    let minimizedColumn = -1;
    for (let col=0; col<numWide; col++) {
        if (!columnFull(board, col)) {
            place(board, col, false);
            const currentValue = minimax(board, 0, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, true);
            if (currentValue < value) {
                value = currentValue;
                minimizedColumn = col;
            }
            remove(board, col);
        }
    }
    return minimizedColumn;
}

function minimax(board, depth, alpha, beta, blue) {
    //drawing(board); 

    // base cases
    const currentState = state(board);
    switch (currentState) {
        case "tie": return 0;
        case "blue": return 1;
        case "red": return -1;
    }
    if (depth == maxDepth) {
        return 0;
    }

    // recursive case
    if (blue) {
        let value = Number.NEGATIVE_INFINITY;
        for (let col=0; col<numWide; col++) {
            if (!columnFull(board, col)) {
                place(board, col, blue);
                const currentValue = minimax(board, depth+1, alpha, beta, !blue);
                if (currentValue > value)
                    value = currentValue;
                remove(board, col);

                //alpha beta pruning
                if (value > alpha)
                    alpha = value;
                if (alpha >= beta)
                    break;
            }
        }
        return value;
    } else {
        let value = Number.POSITIVE_INFINITY;
        for (let col=0; col<numWide; col++) {
            if (!columnFull(board, col)) {
                place(board, col, blue);
                const currentValue = minimax(board, depth+1, alpha, beta, !blue);
                if (currentValue < value)
                    value = currentValue;
                remove(board, col);

                //alpha beta pruning
                if (value < beta)
                    beta = value;
                if (alpha >= beta)
                    break;
            }
        }
        return value;
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function drawing(board) {
    for (let row=numHigh-1; row>=0; row--) {
        let string = "";
        for (let col=0; col<numWide; col++) {
            let char = '_';
            switch (board[col][row]) {
                case "blue": 
                    char = 'B';
                    break;
                case "red":
                    char = 'r';
                    break;
            }
            string += char + ' ';
        }
        console.log(string);
    }
    console.log();
    sleep(1000);
}