const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector("#restart");
const statusMsg = document.querySelector("#msg");

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;

function initialiseGame() {
    cells.forEach(cell => {
        cell.addEventListener("click", cellClicked);
    });
    restartBtn.addEventListener("click", restartGame);
    statusMsg.textContent = `${currentPlayer}'s turn`;
    running = true;
};

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running) 
        {
            return;
        }
    updateCell(this, cellIndex);
    checkWinner();
};

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
};

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusMsg.textContent = `${currentPlayer}'s turn`;
};

function checkWinner() {
        let roundWon = false;

    for (i = 0; i < winPatterns.length; i++) {
        const condition = winPatterns[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
            
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }
    
    if (roundWon) {
        statusMsg.textContent = `🏆 ${currentPlayer} is the winner!`;
        running = false;
    }
    else if (!options.includes("")) {
        statusMsg.textContent = `It's a draw!`;
        running = false;
    }
    else {
        changePlayer();
    }
};

function restartGame() {
    options = ["","","","","","","","",""];
    currentPlayer = "X";
    cells.forEach(cell => cell.textContent = "");
    statusMsg.textContent = `${currentPlayer}'s turn`;
    running = true;
};

initialiseGame();