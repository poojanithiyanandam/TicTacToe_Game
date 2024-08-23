let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

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

function makeMove(index) {
    if (board[index] === '' && isGameActive) {
        board[index] = currentPlayer;
        document.getElementById(`cell-${index}`).innerText = currentPlayer;
        if (checkWinner()) {
            document.getElementById('message').innerText = `${currentPlayer} wins!`;
            isGameActive = false;
            highlightWinningCells();
            playCheerSound();
            triggerConfetti();
        } else if (board.includes('')) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        } else {
            document.getElementById('message').innerText = 'It\'s a draw!';
            isGameActive = false;
        }
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function highlightWinningCells() {
    winningConditions.forEach(condition => {
        if (condition.every(index => board[index] === currentPlayer)) {
            condition.forEach(index => {
                document.getElementById(`cell-${index}`).classList.add('winner');
            });
        }
    });
}

function playCheerSound() {
    const cheerSound = new Audio('cheer.mp3');
    cheerSound.play();
}

function triggerConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        document.body.appendChild(confetti);
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = Math.random() * window.innerHeight + 'px';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        setTimeout(() => confetti.remove(), 2000);
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('winner');
    });
    document.getElementById('message').innerText = '';
}
