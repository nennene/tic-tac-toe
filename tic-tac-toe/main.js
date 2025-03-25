let board =
 ['', '', '',
 '', '', '',
  '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.innerText = cell;
        cellElement.addEventListener("click", handleCellClick);
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (board[index] !== '' || !gameActive) return;
    board[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    event.target.classList.add("taken");
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById("status").innerText = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById("status").innerText = `Player ${board[a]} Wins!`;
            gameActive = false;
            return;
        }
    }
    if (!board.includes('')) {
        document.getElementById("status").innerText = "It's a Draw!";
        gameActive = false;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById("status").innerText = "Player X's Turn";
    createBoard();
}

createBoard();