const Game = (() => {
    let turn = 1;
    let gameover = false;

    const getTurn = () => {
        return turn;
    }

    const updateTurn = () => {
        turn = (turn === 1 ? 2 : 1);
    }

    const getGameOver = () => {
        return gameover;
    }

    const setGameOver = (win) => {
        gameover = win || gameBoard.checkDraw();
    }

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
            document.querySelector(`.tile-${tileID}`).innerText = mark;
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

    const initialize = () => {
        const get_btn_input = (btn) => {
            let input = btn.innerText;

            document.querySelector('.mark-selection-chosen').innerText = input;
        }

        document.querySelectorAll('.mark-selection-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                get_btn_input(btn);
            })
        })

        document.querySelector('.game-start-btn').addEventListener('click', () => {
            play();
        })
    }

    // const playTurn = (players) => {
    //     let turn = getTurn()
    //     const currentPlayer = players[turn]
    //     let tile = "";

    //     if(currentPlayer.name == "Computer") {
    //         let moves = gameBoard.getAvailableTiles()
    //         tile = get_random(moves)
    //     } else {
    //         console.log(`It's ${currentPlayer.name}'s turn.`)
    //         tile = prompt("Enter the id of the tile to mark.");
    //     }
    //     let isMoveLegal = gameBoard.checkLegalMove(tile)
    //     if (isMoveLegal) {
    //         currentPlayer.makeMove(tile);
    //     } else {
    //         console.log("Illegal Move!");
    //     }

    //     console.log(gameBoard.getGameboard());
    //     console.log(gameBoard.getAvailableTiles());
        
    //     let win = gameBoard.checkWin(currentPlayer.mark);
    //     win && console.log(`${currentPlayer.name} won!`)
    //     // gameover = win | gameBoard.checkDraw();
    //     setGameOver(win);
    //     updateTurn();
    // }

    const playTurn = (tile) => {
        let turn = getTurn()
        const currentPlayer = players[turn]
        // let tile = "";

        // if(currentPlayer.name == "Computer") {
        //     let moves = gameBoard.getAvailableTiles()
        //     tile = get_random(moves)
        // } else {
        //     console.log(`It's ${currentPlayer.name}'s turn.`)
        //     tile = prompt("Enter the id of the tile to mark.");
        // }
        // let isMoveLegal = gameBoard.checkLegalMove(tile)
        // if (isMoveLegal) {
        //     currentPlayer.makeMove(tile);
        // } else {
        //     console.log("Illegal Move!");
        // }

        console.log(gameBoard.getGameboard());
        console.log(gameBoard.getAvailableTiles());
        
        let win = gameBoard.checkWin(currentPlayer.mark);
        win && console.log(`${currentPlayer.name} won!`)
        // gameover = win | gameBoard.checkDraw();
        setGameOver(win);
        updateTurn();
    }

    const play = () => {
        let player_name = prompt("Input your name");
        
        let player_mark = document.querySelector('.mark-selection-chosen').innerText;
        // while (!(player_mark === "X" || player_mark === "O")) {
        //     player_mark = prompt("choose a mark: X or O");
        //     console.log(player_mark);
        // }
        const player1 = playerFactory(player_mark, player_name);
        const player2 = playerFactory((player_mark == "X" ? "O" : "X"), "Computer");
        const players = playersFactory(player1, player2);

        console.log(gameBoard.getGameboard());
        console.log(gameBoard.getAvailableTiles());

        // while (!getGameOver(gameover)) {
        //     playTurn(players)
        // }

        document.querySelectorAll('.tile').forEach(tile => {
            tile.addEventListener('click', (e) => {
                e.preventDefault();
                let tileNum = tile.dataset.tileNumber;
                console.log(tileNum)
                playTurn(tileNum)
            })
        })
    
        // console.log(gameBoard.checkDraw());
        // gameBoard.markTile('11', 'X');
        // gameBoard.markTile('01', '0');
        // gameBoard.markTile('01', 'X');
    
        // console.log(gameBoard.getGameboard());
        // console.log(gameBoard.getAvailableTiles());
    }

    return {initialize, play};
})();

function main() {
    Game.initialize();
    // Game.play();
}
main();