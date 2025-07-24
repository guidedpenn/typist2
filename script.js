// Simple Wordle-like game in JavaScript + HTML + CSS

const words = ["chiton"];
const secretWord = "chiton";

let attempts = 0;
const maxAttempts = 6;
let currentGuess = "";

function updateDisplay() {
  const inputBoxes = document.querySelectorAll(".letter-box");
  inputBoxes.forEach((box, i) => {
    box.textContent = currentGuess[i] || "";
  });
}

function addLetter(letter) {
  if (currentGuess.length < 6) {
    currentGuess += letter;
    updateDisplay();
  }
}

function deleteLastChar() {
  currentGuess = currentGuess.slice(0, -1);
  updateDisplay();
}

function checkGuess() {
  if (currentGuess.length !== 6) {
    alert("Guess must be a 6-letter word.");
    return;
  }

  const resultDiv = document.getElementById("result");
  const feedback = document.createElement("div");

  attempts++;
  let result = "";

  for (let i = 0; i < 6; i++) {
    if (currentGuess[i] === secretWord[i]) {
      result += `<span class='green'>${currentGuess[i]}</span>`;
    } else if (secretWord.includes(currentGuess[i])) {
      result += `<span class='yellow'>${currentGuess[i]}</span>`;
    } else {
      result += `<span class='gray'>${currentGuess[i]}</span>`;
    }
  }

  feedback.innerHTML = result;
  resultDiv.appendChild(feedback);

  if (currentGuess === secretWord) {
    alert("Congratulations! You guessed the word!");
    disableKeyboard();
  } else if (attempts >= maxAttempts) {
    alert(`Out of attempts! The word was: ${secretWord}`);
    disableKeyboard();
  }

  currentGuess = "";
  updateDisplay();
}

function disableKeyboard() {
  document.querySelectorAll(".key").forEach(key => key.disabled = true);
}

// HTML structure
document.body.innerHTML = `
  <div class="container">
    <h1>Mini Wordle</h1>
    <div id="play-area">
      ${"_".repeat(6).split("").map(() => '<div class="letter-box"></div>').join("")}
    </div>
    <div class="keyboard">
      <div class="key-row">
        ${"QWERTYUIOP".split("").map(l => `<button class="key" onclick="addLetter('${l.toLowerCase()}')">${l}</button>`).join("")}
      </div>
      <div class="key-row">
        ${"ASDFGHJKL".split("").map(l => `<button class="key" onclick="addLetter('${l.toLowerCase()}')">${l}</button>`).join("")}
      </div>
      <div class="key-row">
        ${"ZXCVBNM".split("").map(l => `<button class="key" onclick="addLetter('${l.toLowerCase()}')">${l}</button>`).join("")}
      </div>
      <div class="control-row">
        <button class="control-key" onclick="deleteLastChar()">Delete</button>
        <button class="control-key" onclick="checkGuess()">Guess</button>
      </div>
    </div>
    <div id="result"></div>
  </div>
`;

// Basic styling
const style = document.createElement('style');
style.textContent = `
  body {
    font-family: sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background: #001f3f;
    color: white;
    margin: 0;
  }
  .container {
    text-align: center;
    padding: 20px;
  }
  #play-area {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .letter-box {
    width: 50px;
    height: 50px;
    margin: 5px;
    border: 2px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    background: white;
    color: black;
    border-radius: 5px;
  }
  .keyboard {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 20px;
  }
  .key-row, .control-row {
    display: flex;
    justify-content: center;
    gap: 5px;
    flex-wrap: wrap;
  }
  .key {
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    background: #0074D9;
    color: white;
    min-width: 40px;
  }
  .control-key {
    background: #39CCCC;
    font-weight: bold;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    min-width: 80px;
  }
  #result div {
    margin: 5px 0;
  }
  .green {
    background: #6aaa64;
    color: white;
    padding: 5px;
    margin: 2px;
    display: inline-block;
    width: 30px;
    text-align: center;
    border-radius: 4px;
  }
  .yellow {
    background: #c9b458;
    color: white;
    padding: 5px;
    margin: 2px;
    display: inline-block;
    width: 30px;
    text-align: center;
    border-radius: 4px;
  }
  .gray {
    background: #787c7e;
    color: white;
    padding: 5px;
    margin: 2px;
    display: inline-block;
    width: 30px;
    text-align: center;
    border-radius: 4px;
  }
`;
document.head.appendChild(style);
