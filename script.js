const board = document.getElementById("board");
const message = document.getElementById("message");

const words = ["apple", "grape", "mango", "pearl", "brick"];
const targetWord = words[Math.floor(Math.random() * words.length)];
let attempts = 6;
let currentRow = 0;

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < attempts; i++) {
    for (let j = 0; j < 5; j++) {
      const tile = document.createElement("input");
      tile.type = "text";
      tile.maxLength = 1;
      tile.classList.add("tile");
      tile.dataset.row = i;
      tile.dataset.col = j;

      // Handle input and movement
      tile.addEventListener("input", handleInput);
      tile.addEventListener("keydown", handleBackspace);

      board.appendChild(tile);
    }
  }

  focusTile(0, 0); // Start at the first tile
}

function handleInput(e) {
  const tile = e.target;
  const row = parseInt(tile.dataset.row);
  const col = parseInt(tile.dataset.col);
  const value = tile.value.toLowerCase();

  if (value.match(/[a-z]/i)) {
    tile.value = value;
    if (col < 4) {
      focusTile(row, col + 1); // Move to the next tile
    } else {
      checkRow(row); // Check the row when it's full
    }
  }
}

function handleBackspace(e) {
  const tile = e.target;
  const row = parseInt(tile.dataset.row);
  const col = parseInt(tile.dataset.col);

  if (e.key === "Backspace" && !tile.value && col > 0) {
    focusTile(row, col - 1); // Move back if the tile is empty
  }
}

function focusTile(row, col) {
  const tiles = document.querySelectorAll(".tile");
  const nextTile = Array.from(tiles).find(
    (t) => parseInt(t.dataset.row) === row && parseInt(t.dataset.col) === col
  );
  nextTile.focus();
}

function checkRow(row) {
  let guess = "";
  const tiles = document.querySelectorAll(`.tile[data-row="${row}"]`);

  tiles.forEach((tile) => (guess += tile.value));

  if (guess.length === 5) {
    for (let i = 0; i < 5; i++) {
      const tile = tiles[i];
      const letter = tile.value;

      if (letter === targetWord[i]) {
        tile.classList.add("green");
      } else if (targetWord.includes(letter)) {
        tile.classList.add("yellow");
      } else {
        tile.classList.add("gray");
      }
    }

    if (guess === targetWord) {
      setMessage("Congratulations! You guessed the word!");
      disableBoard();
    } else {
      currentRow++;
      if (currentRow === attempts) {
        setMessage(`Game over! The word was "${targetWord}".`);
        disableBoard();
      } else {
        focusTile(currentRow, 0); // Move to the next row
      }
    }
  }
}

function setMessage(text) {
  message.textContent = text;
}

function disableBoard() {
  document.querySelectorAll(".tile").forEach((tile) => (tile.disabled = true));
}

createBoard();
