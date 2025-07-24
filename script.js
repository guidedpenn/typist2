// Simple Wordle-like game in JavaScript + HTML + CSS

const words = ["chiton"];
const secretWord = "chiton";

let attempts = 0;
const maxAttempts = 6;

function checkGuess() {
  const input = document.getElementById("guess");
  const guess = input.value.toLowerCase();
  const resultDiv = document.getElementById("result");
  const feedback = document.createElement("div");

  if (guess.length !== 6) {
    alert("Guess must be a 6-letter word.");
    return;
  }

  attempts++;
  let result = "";

  for (let i = 0; i < 6; i++) {
    if (guess[i] === secretWord[i]) {
      result += `<span class='green'>${guess[i]}</span>`;
    } else if (secretWord.includes(guess[i])) {
      result += `<span class='yellow'>${guess[i]}</span>`;
    } else {
      result += `<span class='gray'>${guess[i]}</span>`;
    }
  }

  feedback.innerHTML = result;
  resultDiv.appendChild(feedback);

  if (guess === secretWord) {
    alert("Congratulations! You guessed the word!");
    input.disabled = true;
  } else if (attempts >= maxAttempts) {
    alert(`Out of attempts! The word was: ${secretWord}`);
    input.disabled = true;
  }

  input.value = "";
}

function deleteLastChar() {
  const input = document.getElementById("guess");
  input.value = input.value.slice(0, -1);
}

// HTML structure
document.body.innerHTML = `
  <div class="container">
    <h1>Mini Wordle</h1>
    <input id="guess" type="text" maxlength="6" placeholder="Enter 6-letter word" />
    <div>
      <button onclick="checkGuess()">Guess</button>
      <button onclick="deleteLastChar()">Delete</button>
    </div>
    <div id="result"></div>
  </div>
`;

// Basic styling
const style = document.createElement('style');
style.textContent = `
  body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f4f4f4; }
  .container { text-align: center; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
  input { padding: 10px; font-size: 16px; margin: 10px; }
  button { padding: 10px 20px; font-size: 16px; margin: 5px; }
  #result div { margin: 5px 0; }
  .green { background: #6aaa64; color: white; padding: 5px; margin: 2px; display: inline-block; width: 20px; text-align: center; border-radius: 4px; }
  .yellow { background: #c9b458; color: white; padding: 5px; margin: 2px; display: inline-block; width: 20px; text-align: center; border-radius: 4px; }
  .gray { background: #787c7e; color: white; padding: 5px; margin: 2px; display: inline-block; width: 20px; text-align: center; border-radius: 4px; }
`;
document.head.appendChild(style);
