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

    markAndCheck(e) {
        
        if (game.getTurn === 0) {

        }
    }



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

// const newGame = document.querySelector(".new-game");
// newGame.addEventListener('click', )



game = {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    },
    turn: 0,
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
        return this.currentPlayer;
    },
    getTurn: function() {
        return this.turn;
    },
    setTurn: function() {
        this.turn = (this.turn + 1);
    },
    addEvents: function() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            tile.addEventListener('click', (e) => {
                if (e.target.innerHTML === '') {
                    const playerNow = this.currentPlayer();
                    console.log(playerNow);
                    e.target.innerHTML = playerNow.getMarker();
                    this.setTurn();
                }
            })
        })
    },

}

const player1 = new Player('Player1', 'X');
const player2 = new Player('Player2', 'O');

game.addEvents();



