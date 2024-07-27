let currentPlayer = 'X';
let gameActive = true;
const gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const resultDisplay = document.getElementById('result-display');
const cells = document.querySelectorAll('.cell');

function placeMarker(cell) {
    const index = Array.from(cells).indexOf(cell);
    if (gameState[index] === '' && gameActive) {
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('placed');
        if (checkWin()) {
            announceResult(`${currentPlayer} wins!`);
            gameActive = false;
            highlightWinningCells();
            setTimeout(() => animateWinner(), 500);
        } else if (isDraw()) {
            announceResult('It\'s a draw!');
            gameActive = false;
            setTimeout(() => animateDraw(), 500);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function isDraw() {
    return gameState.every(cell => {
        return cell !== '';
    });
}

function announceResult(message) {
    alert(message);
}

function highlightWinningCells() {
    winningConditions.forEach(condition => {
        const [a, b, c] = condition;
        const cellA = cells[a];
        const cellB = cells[b];
        const cellC = cells[c];
        cellA.classList.add('winning-cell');
        cellB.classList.add('winning-cell');
        cellC.classList.add('winning-cell');
    });
}

function animateWinner() {
    cells.forEach(cell => {
        if (gameState[Array.from(cells).indexOf(cell)] === currentPlayer) {
            cell.classList.add('winner');
        }
    });

}

function animateDraw() {
    cells.forEach(cell => {
        cell.classList.add('draw');
    });
}

function resetBoard() {
    currentPlayer = 'X';
    gameActive = true;
    gameState.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('placed', 'winning-cell', 'winner', 'draw');
    });
}


