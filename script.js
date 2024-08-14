// Each piece of functionality should fit in the game, player or gameboard objects.



gameboard = {
    board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
    ],
    createNewBoard() {
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''] 
        ];
    },
    
    markBoard(row, col, player) {
        if (this.isCellEmpty(row, col) && this.isValidPlayer(player)) {
            this.board[row][col] = player;
            return true;
        }
        return false;
    },
    isCellEmpty(row, col) {
        return this.board[row][col] === '';
    },

    isValidPlayer(player) {
        return player === 'X' || player === 'O';
    },

    checkWin() {
        const lines = [
            // Rows
            [this.board[0][0], this.board[0][1], this.board[0][2]],
            [this.board[1][0], this.board[1][1], this.board[1][2]],
            [this.board[2][0], this.board[2][1], this.board[2][2]],
            // Columns
            [this.board[0][0], this.board[1][0], this.board[2][0]],
            [this.board[0][1], this.board[1][1], this.board[2][1]],
            [this.board[0][2], this.board[1][2], this.board[2][2]],
            // Diagonals
            [this.board[0][0], this.board[1][1], this.board[2][2]],
            [this.board[0][2], this.board[1][1], this.board[2][0]]
        ];

        for (const line of lines) {
            if (line[0] !== '' && line[0] === line[1] && line[1] === line[2]) {
                return line[0];
            }
        }
        return null;
    },

    isBoardFull() {
        return this.board.every(row => row.every(cell => cell !== ''));
    },

    display() {
        console.log(this.board.map(row => row.join(' | ')).join('\n---------\n'));
    },


}


class Player {
    constructor(name, marker) {
        this.name = name;
        this.marker = marker;
    }

    getName() {
        return this.name;
    }

    getMarker() {
        return this.marker;
    }
}



game = {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.turn = 0;
    },
    currentPlayer: function() {
        if (this.turn === 0) {
            return player1;
        } else if (this.turn === 1) {
            return player2;
        } else if (this.turn % 2 === 0) {
            return player1;
        } else {
            return player2;
        }
    },
    getCurrentPlayer: function() {
        return this.currentPlayer();
    },
    getTurn: function() {
        return this.turn;
    },
    setTurn: function() {
        this.turn += 1;
    },
    addEvents: function() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            tile.addEventListener('click', (e) => {
                if (e.target.innerHTML === '') {
                    const playerNow = this.getCurrentPlayer();
                    // console.log(playerNow);
                    e.target.innerHTML = playerNow.getMarker();

                    //convert tile ID to row & column
                    const index = parseInt(e.target.id);
                    const row = Math.floor(index / 3);
                    const col = index % 3;

                    //update gameboard

                    if (gameboard.markBoard(row, col, playerNow.getMarker())) {
                        //check for win or draw
                        //set timeout to make sure mark appears before alert
                        setTimeout(() => {
                        const winner = gameboard.checkWin();
                        if (winner) {
                            alert(`${winner} wins!`);
                        } else if (gameboard.isBoardFull()) {
                            alert(`It's a draw!`);
                        } else {
                        this.setTurn();
                        }
                    }, 50);
                    }

                    // this.setTurn();
                    // gameboard.markBoard(parseInt(e.target.id) / 3, parseInt(e.target.id) % 3, playerNow.getMarker());

                    // const winner = gameboard.checkWin();
                    // if (winner) {
                    //     alert(`${winner} wins!`);
                    // } else if (this.getTurn() >= 9) {
                    //     alert(`It's a draw!`);
                    // }
                }
            });
        });
    },
    newGame() {
            gameboard.createNewBoard();
            //clear tile contents
            const tiles = document.querySelectorAll('.tile');
            tiles.forEach(tile => {
                tile.innerHTML = '';
            });
            //reset turn to 0
            this.turn = 0;
    },
    
    startNew() {
        const newGameButton = document.querySelector(".nav");
        newGameButton.addEventListener('click', () => {
            console.log('New game button clicked');
            this.newGame();
        });
    }
    
};

const player1 = new Player('Player1', 'X');
const player2 = new Player('Player2', 'O');
const gameInstance = Object.create(game);
gameInstance.constructor(player1, player2);

gameInstance.addEvents();
gameInstance.startNew();



