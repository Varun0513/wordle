// script.js

// List of possible words (you can expand this)
const wordList = ["apple", "grape", "mango", "peach", "berry"];
let word = wordList[Math.floor(Math.random() * wordList.length)]; // Randomly select a word

let currentRow = 0;
let currentGuess = "";
const maxGuesses = 6;

// Function to generate the game board
function generateGameBoard() {
    const board = document.getElementById("game-board");
    for (let i = 0; i < maxGuesses * 5; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        board.appendChild(tile);
    }
}

// Function to generate the on-screen keyboard
function generateKeyboard() {
    const keyboard = document.getElementById("keyboard");
    const keys = "abcdefghijklmnopqrstuvwxyz".split("");
    keys.forEach(key => {
        const keyButton = document.createElement("div");
        keyButton.classList.add("key");
        keyButton.innerText = key;
        keyButton.addEventListener("click", () => handleKeyPress(key));
        keyboard.appendChild(keyButton);
    });
}

// Handle key press events
function handleKeyPress(key) {
    if (currentGuess.length < 5) {
        currentGuess += key;
        updateBoard();
    }
}

// Function to handle guesses submission
function submitGuess() {
    if (currentGuess.length === 5) {
        checkGuess(currentGuess);
        currentGuess = "";
        currentRow++;
    }
}

// Update the game board with the current guess
function updateBoard() {
    const board = document.querySelectorAll(".tile");
    const rowStart = currentRow * 5;
    for (let i = 0; i < currentGuess.length; i++) {
        board[rowStart + i].innerText = currentGuess[i];
    }
}

// Check the current guess against the correct word
function checkGuess(guess) {
    const board = document.querySelectorAll(".tile");
    const rowStart = currentRow * 5;

    for (let i = 0; i < guess.length; i++) {
        const tile = board[rowStart + i];
        if (guess[i] === word[i]) {
            tile.classList.add("correct");
        } else if (word.includes(guess[i])) {
            tile.classList.add("close");
        } else {
            tile.classList.add("wrong");
        }
    }

    // Check if the player won
    if (guess === word) {
        showMessage("Congratulations! You guessed the word!");
    } else if (currentRow === maxGuesses - 1) {
        showMessage(`Game over! The word was: ${word}`);
    }
}

// Show a message to the player
function showMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.innerText = message;
}

// Listen for Enter key to submit the guess
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        submitGuess();
    }
});

// Initialize the game
generateGameBoard();
generateKeyboard();
