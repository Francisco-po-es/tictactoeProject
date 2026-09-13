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
    return {showBoard, writeBoard};
})();

function createPlayer(name, marker) {
    if (marker.toLowerCase() !== 'o' && marker.toLowerCase() !== 'x') {
        return false;
        // returning boolean for GameController function that gives message to player
    }
    return {name, marker};
}

board.showBoard();
board.writeBoard(8, 'x');
board.showBoard();

const player1 = createPlayer('Mark', 'O');
console.log(player1)