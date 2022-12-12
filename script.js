function playGame() {
    const gameBoard = (() => {
        let gameboard = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]

        let availableTiles = [
            '00', '01', '02',
            '10', '11', '12',
            '20', '21', '22'
        ]

        const getGameboard = () => {
            return gameboard;
        }

        const getAvailableTiles = () => {
            return availableTiles;
        }

        const markTile = (tileID, mark) => {
            let row = Number(tileID[0]);
            let col = Number(tileID[1]);
            console.log(row, col);

            gameboard[row][col] = mark;
            availableTiles.splice((row * 3) + col, 1);
        }

        return {getGameboard, getAvailableTiles, markTile}
    })();

    const playerFactory = (mark) => {
        return {mark};
    }

    console.log("yo!");

    console.log(gameBoard.getGameboard());
    console.log(gameBoard.getAvailableTiles());

    gameBoard.markTile('11', 'X')

    console.log(gameBoard.getGameboard());
    console.log(gameBoard.getAvailableTiles());
}

function main() {
    playGame();
}
main();