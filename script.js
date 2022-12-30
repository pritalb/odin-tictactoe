const Game = (() => {
    let turn = 1;
    let gameover = false;
    let playingAgainstAI = true;

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

    const setPlayAgainstAI = () => {
        playingAgainstAI = true;
    }

    const setPlayAgainstHuman = () => {
        playingAgainstAI = false;
    }

    const getPlayingAgainstAI = () => {
        return playingAgainstAI;
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

        const reset = () => {
            gameboard = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ]

            availableTiles = [
                '00', '01', '02',
                '10', '11', '12',
                '20', '21', '22'
            ]

            document.querySelector('.message-container').innerText = "Click on a tile to play your turn";
            setGameOver(false);
        }

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
            document.querySelector(`.tile-${tileID}`).innerText = mark;
            availableTiles.splice(index, 1);
        }

        return {getGameboard, getAvailableTiles, checkLegalMove, checkDraw, checkWin, markTile, reset}
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

        document.querySelector('.ai-game-btn').addEventListener('click', () => {
            document.querySelector('.ai-selection-prompt').innerText = "AI";
            setPlayAgainstAI();
        })
        document.querySelector('.human-game-btn').addEventListener('click', () => {
            document.querySelector('.ai-selection-prompt').innerText = "Human";
            setPlayAgainstHuman();
        })

        document.querySelector('.game-start-btn').addEventListener('click', () => {
            document.querySelectorAll('.tile').forEach(tile => {
                tile.innerText = "";
            })

            gameBoard.reset();
            play();
        })
    }

    const setMessage = (msg) => {
        document.querySelector('.message-container').innerText = msg;
    }

    const hasPlayerWon = (player) => {
        let win = gameBoard.checkWin(player.mark);
        win && setMessage(`${player.name} won!`);
        // gameover = win | gameBoard.checkDraw();
        setGameOver(win);
        return win;
    }

    const playTurnAgainstHuman = (players, tile) => {
        console.log('playing turn.....');

        let turn = getTurn()
        const currentPlayer = players[turn]
        // let tile = "";

        setMessage(`It's ${currentPlayer.name}'s turn.`);
        let isMoveLegal = gameBoard.checkLegalMove(tile)
        console.log(isMoveLegal);
        if (isMoveLegal) {
            currentPlayer.makeMove(tile);
        } else {
            // setMessage("Illegal Move!");
            return;
        }
        let playerVictory = hasPlayerWon(currentPlayer);
        let isGamedrawn = gameBoard.checkDraw();

        // let computerPlayerVictory = false;
        // if (!firstPlayerVictory && !isGamedrawn) {
        //     computerTurn();
        //     computerPlayerVictory = hasPlayerWon(computerPlayer);

        //     if (!computerPlayerVictory) {
        //         setMessage(`It's ${currentPlayer.name}'s turn.`);
        //     }
        // }

        console.log(gameBoard.getGameboard());
        console.log(gameBoard.getAvailableTiles());
        
        if (isGamedrawn && !playerVictory) {
            setMessage("Game Drawn!");
            setGameOver(true);
            return;
        }

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

        // console.log(gameBoard.getGameboard());
        // console.log(gameBoard.getAvailableTiles());
        
        // let win = gameBoard.checkWin(currentPlayer.mark);
        // win && console.log(`${currentPlayer.name} won!`)
        // // gameover = win | gameBoard.checkDraw();
        // setGameOver(win);
        updateTurn();

        if (!(isGamedrawn || playerVictory)) {
            setMessage(`It's ${players[getTurn()].name}'s turn.`);
        }
    }

    const playTurnAgainstAI = (players, tile) => {
        // let turn = getTurn();
        const currentPlayer = players[1];
        const computerPlayer = players[2];

        const computerTurn = () => {
            setMessage(`It's ${computerPlayer.name} turn.`);

            let moves = gameBoard.getAvailableTiles();
            let computerTile = get_random(moves);
            let isLegal = gameBoard.checkLegalMove(computerTile);

            while(!isLegal) {
                computerTile = get_random(moves);
                isLegal = gameBoard.checkLegalMove(computerTile)
            }

            computerPlayer.makeMove(computerTile);
        }

        // let tile = "";

        // if(currentPlayer.name == "Computer") {
        // } else {
        
        // console.log(`It's ${currentPlayer.name}'s turn.`);
            // tile = prompt("Enter the id of the tile to mark.");
        // }
        setMessage(`It's ${currentPlayer.name}'s turn.`);
        let isMoveLegal = gameBoard.checkLegalMove(tile)
        if (isMoveLegal) {
            currentPlayer.makeMove(tile);
        } else {
            // setMessage("Illegal Move!");
            return;
        }
        let firstPlayerVictory = hasPlayerWon(currentPlayer);
        let isGamedrawn = gameBoard.checkDraw();

        let computerPlayerVictory = false;
        if (!firstPlayerVictory && !isGamedrawn) {
            computerTurn();
            computerPlayerVictory = hasPlayerWon(computerPlayer);

            if (!computerPlayerVictory) {
                setMessage(`It's ${currentPlayer.name}'s turn.`);
            }
        }

        console.log(gameBoard.getGameboard());
        console.log(gameBoard.getAvailableTiles());
        
        if (isGamedrawn && !firstPlayerVictory && !computerPlayerVictory) {
            setMessage("Game Drawn!");
            setGameOver(true);
            return;
        }

        // updateTurn();
    }

    const play = () => {
        let player1_name = document.querySelector('.player1-name-input-field').value;
        let player2_name = document.querySelector('.player2-name-input-field').value;
        
        let player_mark = document.querySelector('.mark-selection-chosen').innerText;
        // while (!(player_mark === "X" || player_mark === "O")) {
        //     player_mark = prompt("choose a mark: X or O");
        //     console.log(player_mark);
        // }
        const player1 = playerFactory(player_mark, player1_name);
        const player2 = playerFactory((player_mark == "X" ? "O" : "X"), player2_name);
        const players = playersFactory(player1, player2);

        console.log(gameBoard.getGameboard());
        console.log(gameBoard.getAvailableTiles());

        // while (!getGameOver(gameover)) {
        //     playTurn(players)
        // }

        document.querySelectorAll('.tile').forEach(tile => {
            tile.addEventListener('click', (e) => {
                e.preventDefault();
                
                let gameover = getGameOver()
                if (!gameover) {
                    let tileNum = tile.dataset.tileNumber;
                    console.log(tileNum);
                    if (getPlayingAgainstAI()) {
                        playTurnAgainstAI(players, tileNum);
                    } else {
                        playTurnAgainstHuman(players, tileNum);
                    }
                }
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