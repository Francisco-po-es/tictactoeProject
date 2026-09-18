const board = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const showBoard = () => {
        console.log(`${board[0]} | ${board[1]} | ${board[2]}\n${board[3]} | ${board[4]} | ${board[5]}\n${board[6]} | ${board[7]} | ${board[8]}`);
    }

    const writeBoard = (position, marker) => {
        if (position >= 0 && position <= 8) {
            if (board[position] == '') {
                board[position] = marker;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    const getCell = (index) => {
        return board[index];
    }
    return {showBoard, writeBoard, getCell};
})();

function createPlayer(name, marker) {
    if (marker.toLowerCase() !== 'o' && marker.toLowerCase() !== 'x') {
        return false;
        // returning boolean for GameController function that gives message to player
    }
    return {name, marker};
}

const gameController = (() => {

    let gameStatus = true
    const player1 = createPlayer('Mark', 'o');
    const player2 = createPlayer('Isabell', 'x');

    let playerCurrent;

    if (!player1 || !player2 ) {
        console.log('The info you put is wrong');
    } else {
        playerCurrent = player1;
    }


    const checkWin = () => {
        const winningIndex = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
        for (const combination of winningIndex) {
            if (board.getCell(combination[0]) == playerCurrent.marker && board.getCell(combination[1]) == playerCurrent.marker && board.getCell(combination[2]) == playerCurrent.marker) {
                return true;
            }
        }
        return false;
    }

    const checkTie = () => {
        for (let i = 0; i <= 8; i++) {
            if (board.getCell(i) == '') {
                return false;
            }
        }
        return true;
    }

    const changePlayer = () => {
        if (playerCurrent == player1) {
            playerCurrent = player2;
        } else {
            playerCurrent = player1;
        }
    }

    const playerMove = (position) => {
        if (gameStatus) {
            const makeMove = board.writeBoard(position, playerCurrent.marker);
            if (makeMove) {
                board.showBoard();
                const hasWon = checkWin();
                const isDrawn = checkTie();
                if (hasWon) {
                    console.log('You won!');
                    gameStatus = false;
                } else if (isDrawn) {
                    console.log('Its a tie!');
                    gameStatus = false;
                } else {
                    changePlayer();
                }
            } else {
                console.log('Sorry, something wrong happened. Try again with a right number or with an empty cell');
            }
        } else {
            console.log('The game is already over! Please refresh to play again.');
        }
    }

    return {playerMove}
})();

const DOM = (() => {
    const container = document.getElementById('container');
    const board = document.createElement('div');
    board.id = 'board';
    container.appendChild(board);
    const menu = document.createElement('div');
    menu.id = 'menu';
    container.appendChild(menu);
    for (i=0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.id = 'cell';
        board.appendChild(cell);
    }
})()