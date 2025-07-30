// Simple Wordle-like game in JavaScript + HTML + CSS

const words = ["chiton"];
const secretWord = "chiton";

let attempts = 0;
const maxAttempts = 6;
let currentGuess = "";

function updateDisplay() {
  const allRows = document.querySelectorAll(".guess-row");
  const currentRow = allRows[attempts];
  if (!currentRow) return;

  const boxes = currentRow.querySelectorAll(".letter-box");
  boxes.forEach((box, i) => {
    box.textContent = currentGuess[i] || "";
  });
}

function addLetter(letter) {
  if (currentGuess.length < 6 && attempts < maxAttempts) {
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

  const currentRow = document.querySelectorAll(".guess-row")[attempts];
  const boxes = currentRow.querySelectorAll(".letter-box");

  boxes.forEach((box, i) => {
    setTimeout(() => {
      box.classList.add("flip");
      setTimeout(() => {
        if (currentGuess[i] === secretWord[i]) {
          box.classList.add("green");
        } else if (secretWord.includes(currentGuess[i])) {
          box.classList.add("yellow");
        } else {
          box.classList.add("gray");
        }
      }, 150);
    }, i * 300);
  });

  setTimeout(() => {
    if (currentGuess === secretWord) {
      alert("Congratulations! You guessed the word!");
      disableKeyboard();
    } else if (++attempts >= maxAttempts) {
      alert(`Out of attempts! The word was: ${secretWord}`);
      disableKeyboard();
    }
    currentGuess = "";
    updateDisplay();
  }, 6 * 300);
}

function disableKeyboard() {
  document.querySelectorAll(".key").forEach(key => key.disabled = true);
}

// HTML structure
document.body.innerHTML = `
  <div class="container">
    <div class="logo-bar">
  <img src="/mnt/data/CSC.png" alt="Catalina Sea Camp" class="logo">
  <img src="/mnt/data/240x120 astrologo.jpg" alt="AstroCamp" class="logo">
  <img src="/mnt/data/GDI Logo.png" alt="Guided Discoveries" class="logo main-logo">
  <img src="/mnt/data/camp chop logo.jpg" alt="Camp Chop" class="logo">
  <img src="/mnt/data/CIMI logo.Hor.png" alt="CIMI" class="logo">
</div>
    <div id="play-area">
      ${Array.from({ length: 6 }).map(() => `
        <div class="guess-row">
          ${"_".repeat(6).split("").map(() => '<div class="letter-box"></div>').join("")}
        </div>
      `).join("")}
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
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    gap: 8px;
  }
  .guess-row {
    display: flex;
  }
  .letter-box {
    width: 50px;
    height: 50px;
    margin: 3px;
    border: 2px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    background: white;
    color: black;
    border-radius: 5px;
    transition: transform 0.3s ease-in-out;
  }
  .letter-box.flip {
    transform: rotateX(90deg);
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
  .green {
    background: #6aaa64 !important;
    color: white;
  }
  .yellow {
    background: #c9b458 !important;
    color: white;
  }
  .gray {
    background: #787c7e !important;
    color: white;
  }
`;
document.head.appendChild(style);

// Add logo styling
const logoStyle = document.createElement('style');
logoStyle.textContent = `
  .logo {
    display: block;
    margin: 0 auto 20px auto;
    width: 128px;
    height: auto;
  }
`;
document.head.appendChild(logoStyle);

// Add multi-logo banner styling
const brandStyle = document.createElement('style');
brandStyle.textContent = `
  .logo-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .logo-bar .logo {
    height: 60px;
    max-width: 160px;
    object-fit: contain;
    filter: brightness(0) invert(1); /* white-out look */
  }
  .main-logo {
    height: 80px;
  }
`;
document.head.appendChild(brandStyle);
