const maxDepth = 8;

function randomArray(size) {
    let array = [];
    for (let i=0; i<size; i++)
        array.push(i);
    
    for (let i=size -1; i>0; i--) {
        const swapIndex = Math.floor((i + 1)*Math.random());
        const temp = array[i];
        array[i] = array[swapIndex];
        array[swapIndex] = temp;
    }

    return array;
}

function minimax(board, depth, alpha, beta, blue) {
    //drawing(board); 

    // base cases
    const currentState = state(board);
    switch (currentState) {
        case "tie": return 0;
        case "blue": return (maxDepth - depth);
        case "red": return -(maxDepth - depth);
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

function minimaxBlue(board) {
    let value = Number.NEGATIVE_INFINITY;
    let maximizedColumn = -1;
    const randArray = randomArray(numWide);
    for (let i=0; i<numWide; i++) {
        const col = randArray[i];
        if (!columnFull(board, col)) {
            place(board, col, true);
            const currentValue = minimax(board, 0, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, false);
            if (currentValue > value) {
                value = currentValue;
                maximizedColumn = col;
            }
            remove(board, col);
        }
    }
    console.log(value);
    return maximizedColumn;
}

function minimaxRed(board) {
    let value = Number.POSITIVE_INFINITY;
    let minimizedColumn = -1;
    const randArray = randomArray(numWide);
    for (let i=0; i<numWide; i++) {
        const col = randArray[i];
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
    console.log(value);
    return minimizedColumn;
}

function asyncMinimaxBlue(board) { 
    return new Promise((resolve, reject) => {
        resolve(minimaxBlue(board));
    });
}

function asyncMinimaxRed(board) {  
    return new Promise((resolve, reject) => {
        resolve(minimaxRed(board));
    });
}
