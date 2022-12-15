const Game = (() => {
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

        const checkLegalMove = (tileID) => {
            return availableTiles.includes(tileID);
        }

        const checkDraw = () => {
            return availableTiles.length === 0;
        }

        const checkDiagonalWin = (mark) => {
            let win = gameboard[1][1] === mark;
            
            if (!win) {
                return false;
            }

            return  (gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2]) ||
                    (gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0]);
        }

        const checkColumnWin = (mark) => {
            let win = false;

            for (let i = 0; i < 3; i++) {
                let columnFirstElement = gameboard[0][i];
                win = (columnFirstElement === mark && 
                        columnFirstElement === gameboard[1][i] && 
                        gameboard[1][i] === gameboard[2][i]) || win;
            }

            return win;
        }

        const checkRowWin = (mark) => {
            let win = false;

            for(let i = 0; i < 3; i++) {
                let row = gameboard[i]
                console.log(row);

                win = (row[0] === mark && row[0] === row[1] && row[1] === row[2]) || win;
            }

            return win;
        }

        const checkWin = (mark) => {
            return checkColumnWin(mark) || checkRowWin(mark) || checkDiagonalWin(mark);
        }

        const markTile = (tileID, mark) => {
            let row = Number(tileID[0]);
            let col = Number(tileID[1]);
            console.log(row, col);

            gameboard[row][col] = mark;
            let index = availableTiles.indexOf(tileID)
            availableTiles.splice(index, 1);
        }

        return {getGameboard, getAvailableTiles, checkLegalMove, checkDraw, checkWin, markTile}
    })();

    const playerFactory = (mark, name) => {
        const makeMove = (tileID) => {
            gameBoard.markTile(tileID, mark);
        }
        return {mark, name, makeMove};
    }

    const playersFactory = (player1, player2) => {
        return {
            1: player1,
            2: player2,
        }
    }

    const get_random = (list) => {
        return list[Math.floor((Math.random()*list.length))];
    }

    const play = () => {
        let turn = 1;
        let gameover = false;
        let player_name = prompt("Input your name");
        
        let player_mark = prompt("choose a mark: X or O");;
        while (!(player_mark === "X" || player_mark === "O")) {
            player_mark = prompt("choose a mark: X or O");
            console.log(player_mark);
        }
        const player1 = playerFactory(player_mark, player_name);
        const player2 = playerFactory((player_mark == "X" ? "O" : "X"), "Computer");
        const players = playersFactory(player1, player2);

        console.log(gameBoard.getGameboard());
        console.log(gameBoard.getAvailableTiles());
        while (!gameover) {

            const currentPlayer = players[turn]
            let tile = "";

            if(currentPlayer.name == "Computer") {
                let moves = gameBoard.getAvailableTiles()
                tile = get_random(moves)
            } else {
                console.log(`It's ${currentPlayer.name}'s turn.`)
                tile = prompt("Enter the id of the tile to mark.");
            }
            let isMoveLegal = gameBoard.checkLegalMove(tile)
            if (isMoveLegal) {
                currentPlayer.makeMove(tile);
            } else {
                console.log("Illegal Move!");
                continue
            }

            console.log(gameBoard.getGameboard());
            console.log(gameBoard.getAvailableTiles());
            
            let win = gameBoard.checkWin(currentPlayer.mark);
            win && console.log(`${currentPlayer.name} won!`)
            gameover = win | gameBoard.checkDraw();
            turn = (turn === 1 ? 2 : 1);
        }
    
        // console.log(gameBoard.checkDraw());
        // gameBoard.markTile('11', 'X');
        // gameBoard.markTile('01', '0');
        // gameBoard.markTile('01', 'X');
    
        // console.log(gameBoard.getGameboard());
        // console.log(gameBoard.getAvailableTiles());
    }

    return {play};
})();

function main() {
    Game.play();
}
main();