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

board.showBoard();
board.writeBoard(8, 'x');
board.showBoard();