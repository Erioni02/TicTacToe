///Vendos SI FILLON LOJA,KATRORET REZULTATET
const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const resultDisplay = document.getElementById('result');
const restartButton = document.getElementById('restartButton');

///E SHIKON NESE LOJA ESHTE DUKE VAZHDUAR
let currentPlayer = 'X';
let gameActive = true;
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
];
///E SHIKON NESE KA NDONJE FITORE
function checkWin() {
    console.log(`Checking for win condition for player: ${currentPlayer}`);
    return winPatterns.some(pattern => {
        const result = pattern.every(index => {
            console.log(`Checking cell ${index} with value: ${cells[index].innerText}`);
            return cells[index].innerText === currentPlayer;
        });
        console.log(`Pattern ${pattern} result: ${result}`);
        return result;
    });
}
///E SHIKON NESE KA BARAZIM
function checkDraw() {
    console.log("Checking for draw condition...");
    const isDraw = [...cells].every(cell => cell.innerText !== '');
    console.log(`Is draw: ${isDraw}`);
    return isDraw;
}
///KUR NJE KATROR KLIKOHET 
function handleClick(event) {
    const cell = event.target;
    console.log(`Cell clicked: ${cell.dataset.cell}`);
    if (cell.innerText !== '' || !gameActive) {
        console.log("Invalid click: Cell is already filled or game is not active.");
        return;
    }

    cell.innerText = currentPlayer;
    console.log(`Cell ${cell.dataset.cell} set to ${currentPlayer}`);

    if (checkWin()) {
        console.log(`${currentPlayer} has won the game!`);
        resultDisplay.innerText = `${currentPlayer} fiton!`;
        gameActive = false;
        highlightWinningCells();
    } else if (checkDraw()) {
        console.log("Game ended in a draw.");
        resultDisplay.innerText = 'Barazim!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        console.log(`Switched player to: ${currentPlayer}`);
    }
}

function highlightWinningCells() {
    console.log("Highlighting winning cells...");
    winPatterns.forEach(pattern => {
        if (pattern.every(index => cells[index].innerText === currentPlayer)) {
            console.log(`Winning pattern: ${pattern}`);
            pattern.forEach(index => {
                console.log(`Highlighting cell ${index}`);
                cells[index].style.backgroundColor = '#28a745';
            });
        }
    });
}

function restartGame() {
    console.log("Restarting the game...");
    cells.forEach((cell, index) => {
        console.log(`Resetting cell ${index}`);
        cell.innerText = '';
        cell.style.backgroundColor = '#007BFF';
    });
    currentPlayer = 'O';
    gameActive = true;
    resultDisplay.innerText = '';
    console.log("Game reset complete. Current player: O");
}

cells.forEach((cell, index) => {
    console.log(`Adding click listener to cell ${index}`);
    cell.addEventListener('click', handleClick);
});
restartButton.addEventListener('click', restartGame);
