const BOARD = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const showBoard = () => {
        console.log(`${board[0]} | ${board[1]} | ${board[2]}\n${board[3]} | ${board[4]} | ${board[5]}\n${board[6]} | ${board[7]} | ${board[8]}`);
    }

    const clearBoard = () => {
        return board = ["", "", "", "", "", "", "", "", ""];
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
    return {showBoard, writeBoard, getCell, clearBoard};
})();

function createPlayer(name, marker) {
    if (marker.toLowerCase() !== 'o' && marker.toLowerCase() !== 'x') {
        return false;
        // returning boolean for GameController function that gives message to player
    }
    let score = 0;
    return {name, marker, score};
}

const gameController = (() => {

    let gameStatus = true
    let player1;
    let player2;
    let playerCurrent;

    if (!player1 || !player2 ) {
        console.log('The info you put is wrong');
    } else {
        playerCurrent = player1;
    }


    const checkWin = () => {
        const winningIndex = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
        for (const combination of winningIndex) {
            if (BOARD.getCell(combination[0]) == playerCurrent.marker && BOARD.getCell(combination[1]) == playerCurrent.marker && BOARD.getCell(combination[2]) == playerCurrent.marker) {
                return true;
            }
        }
        return false;
    }

    const checkTie = () => {
        for (let i = 0; i <= 8; i++) {
            if (BOARD.getCell(i) == '') {
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

    const resetPoint = () => {
        player1.score = 0;
        player2.score = 0;
    }

    const getPlayer = (number) => {
        if (number == 1) {
            return player1;
        } else if (number == 2) {
            return player2;
        }
    }

    const nextRound = () => {
        BOARD.clearBoard();
        DOM.updateDisplay();
        DOM.updateScore();
        gameStatus = true;
    }

    const resetGame = () => {
        resetPoint();
        nextRound();
    }

    const startGame = (name1, name2) => {
        player1 = createPlayer(name1 || 'Jugador 1', 'x');
        player2 = createPlayer(name2 || 'Jugador 2', 'o');
        playerCurrent = player1;
        nextRound();
    }

    const playerMove = (position) => {
        if (gameStatus) {
            const makeMove = BOARD.writeBoard(position, playerCurrent.marker);
            if (makeMove) {
                BOARD.showBoard();
                DOM.updateDisplay();
                const hasWon = checkWin();
                const isDrawn = checkTie();
                if (hasWon) {
                    DOM.writeModal(`${playerCurrent.name} won!`);
                    playerCurrent.score++;
                    DOM.updateScore();
                    gameStatus = false;
                } else if (isDrawn) {
                    DOM.writeModal('Its a tie!');
                    gameStatus = false;
                } else {
                    changePlayer();
                }
            } else {
                alert('Sorry, something wrong happened. Try again with a right number or with an empty cell');
            }
        } else {
            alert('The game is already over! Please refresh to play again.');
        }
    }

    return {playerMove, getPlayer, resetGame, startGame, nextRound}
})();

const DOM = (() => {
    const container = document.getElementById('container');
    const boardDOM = document.createElement('div');
    boardDOM.id = 'board';
    container.appendChild(boardDOM);
    const menu = document.createElement('div');
    menu.id = 'menu';
    container.appendChild(menu);
    const playerScore = document.createElement('div');
    playerScore.id = 'score-display';
    menu.appendChild(playerScore);

    const player1Score = document.createElement('span');
    const player2Score = document.createElement('span');

    playerScore.appendChild(player1Score);
    playerScore.appendChild(player2Score);

    const startDialog = document.createElement('dialog');
    startDialog.id = 'startDialog';
    const inputName1 = document.createElement('input');
    inputName1.placeholder = "Name for Player 1";
    const inputName2 = document.createElement('input');
    inputName2.placeholder = "Name for Player 2";
    inputName1.id = 'input1';
    inputName2.id = 'input2';
    const startButton = document.createElement('button');
    startButton.id = 'startBtn'
    startButton.textContent = 'Start!';
    container.appendChild(startDialog);
    startDialog.appendChild(inputName1);
    startDialog.appendChild(inputName2);
    startDialog.appendChild(startButton);
    startDialog.showModal();
    startButton.addEventListener('click', () => {
        let name1 = inputName1.value;
        let name2 = inputName2.value;
        gameController.startGame(name1, name2);
        updateScore();
        startDialog.close();
    });

    

    const dialog = document.createElement('dialog');
    dialog.id = 'modal';
    const span = document.createElement('span');
    span.id = 'modal-message';
    container.appendChild(dialog);
    dialog.appendChild(span);
    const nextRoundButton = document.createElement('button');
    nextRoundButton.textContent = 'Next Round';
    nextRoundButton.id = 'nextRoundBtn'
    dialog.appendChild(nextRoundButton)
    nextRoundButton.addEventListener('click', () => {
        gameController.nextRound()
        dialog.close();
    })

    

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.id = 'resetBtn'
    menu.appendChild(resetButton);
    resetButton.addEventListener('click', () => {
        gameController.resetGame();
    })
    

    for (let i=0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell')
        boardDOM.appendChild(cell);
        cell.addEventListener('click', () => {
            gameController.playerMove(i);
        })
    }

    const updateScore = () => {
        player1Score.textContent = `${inputName1.value}: ${gameController.getPlayer(1).score}`;
        player2Score.textContent = `${inputName2.value}: ${gameController.getPlayer(2).score}`;
    }


    const updateDisplay = () => {
        let cells = document.getElementsByClassName('cell');
        for (let i=0; i < 9; i++) {
            cells[i].textContent = BOARD.getCell(i);
        }
    }

    const writeModal = (message) => {
        span.textContent = message;
        dialog.showModal();
    }
    return {updateDisplay, writeModal, updateScore};
})()
