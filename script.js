// Global constants and variables
let selectedWord;
let letterBoxes;
let hangmanImage;
let hangmanNumber;
let messageElement;
let startGameButton;
let letterButtons;
let startTime;

// List (array) of words to be chosen randomly
const wordList = [
  "BLOMMA",
  "LASTBIL",
  "SOPTUNNA",
  "KÖKSBORD",
  "RADIOAPPARAT",
  "VINTER",
  "SOMMAR",
  "DATORMUS",
  "LEJON",
  "RULLTRAPPA",
  "JULTOMTE",
  "SKOGSHYDDA",
  "BILNUMMER",
  "BLYERTSPENNA",
  "SUDDGUMMI",
  "KLÄDSKÅP",
  "VEDSPIS",
  "LJUSSTAKE",
  "SKRIVBORD",
  "HÖGTALARE",
  "STEKPANNA",
  "KASTRULL",
  "KAFFEBRYGGARE",
  "TALLRIK",
  "SOFFBORD",
  "SEGELBÅT",
  "FLYGPLAN",
  "FLYGPLATS",
  "TANGENTBORD",
  "SPEGEL",
  "SPARKCYKEL",
  "PENNFODRAL",
  "FOTBOLL",
  "TUNNELBANA",
  "ISHOCKEY",
  "ABRAKADABRA",
  "JUPITER",
  "SATURNUS",
  "HELIKOPTER",
  "VATTENSKOTER",
];

// --------------------------------------------------

// Function that runs when the entire web page is loaded
function init() {
  // Start button
  startGameButton = document.getElementById("start-game-button");

  // The game starts by clicking the start button
  startGameButton.onclick = startGame;

  // Letter buttons
  letterButtons = document
    .getElementById("letter-buttons")
    .getElementsByTagName("button");

  // Loops through letter buttons and adds the guessLetter function to each button
  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].onclick = guessLetter;
  }

  // Image
  hangmanImage = document.getElementById("hangman");
  // Message
  messageElement = document.getElementById("message");

  // Start button is activated
  startGameButton.disabled = false;
  // Letter buttons are disabled
  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].disabled = true;
  }
}
window.onload = init;

// --------------------------------------------------

// The game starts when you click the start button
function startGame() {
  randomWord();
  showLetterBoxes();

  hangmanImage.src = "img/h0.png"; // Saving first image into the img element
  hangmanNumber = 0; // Variable with number for changing of the images

  // Start button is disabled
  startGameButton.disabled = true;
  // Letter buttons are activated
  for (i = 0; i < letterButtons.length; i++) {
    letterButtons[i].disabled = false;
  }

  messageElement.innerHTML = ""; // Clears message when new game starts

  // Game start time
  let now = new Date();
  startTime = now.getTime(); // Saves time when the game is started
}

// --------------------------------------------------

// Generates random word
function randomWord() {
  let oldWord = selectedWord; // Saves the randomized word for later use to prevent the word from being randomized again

  // Generates a new random number and word, as long as it is the same as the previous word
  while (oldWord == selectedWord) {
    let ix = Math.floor(Math.random() * wordList.length); // Generates random numbers from 0 to max in the array
    selectedWord = wordList[ix]; // Saves randomized word
  }
}

// --------------------------------------------------

// Loops through the selected word and creates a code with a span element for each letter.
function showLetterBoxes() {
  let newCode = ""; // Variable to save letter boxes

  // Generates boxes for the random word
  for (i = 0; i < selectedWord.length; i++) {
    newCode += "<span>&nbsp;</span>";
  }

  document.getElementById("letter-boxes").innerHTML = newCode; // Prints the letter boxes
  // Reference to the div element and letter boxes are saved in the variable
  letterBoxes = document
    .getElementById("letter-boxes")
    .getElementsByTagName("span");
}

// --------------------------------------------------

// Reads the selected letter and checks if it is in the word
function guessLetter() {
  this.disabled = true; // Deactivation of the letter button that has been pressed
  let letter = this.value; // Reads the letter of the pressed button and saves it in the local variable

  let letterFound = false; // Boolean for checking if the letter is included in the word
  let correctLettersCount = 0; // Variable to save number of correctly guessed letters

  // Loops through the selected word, checks if the letter matches and prints it
  for (i = 0; i < selectedWord.length; i++) {
    if (letter == selectedWord.charAt(i)) {
      letterBoxes[i].innerHTML = letter;
      letterFound = true; // Boolean for checking if the letter is included in the word
    }
    // Checks the number of guessed letters
    if (letterBoxes[i].innerHTML !== "&nbsp;") {
      correctLettersCount++; // Increases the number of guessed letters
    }
  }
  // Checks if the letter is not in the word and changes the image
  if (letterFound == false) {
    hangmanNumber++; // Increases the image number
    hangmanImage.src = "img/h" + hangmanNumber + ".png"; // Showing the new image

    // Ends the game if you get to image 6
    if (hangmanNumber == 6) {
      endGame(true);
    }
  }
  // The game ends if the number of guessed letters equals the number of letter boxes
  if (correctLettersCount == selectedWord.length) {
    endGame(false);
  }
}

// --------------------------------------------------

// Calculates the game time and prints the game result
function endGame(manHanged) {
  // Calculates the time difference between the start and end of the game
  let runTime = (new Date().getTime() - startTime) / 1000;

  // Checks if the man was hanged or not and prints a message
  if (manHanged == true) {
    messageElement.innerHTML = "Rätt svar är " + selectedWord;
  } else {
    messageElement.innerHTML = "Grattis!";
  }
  // The start button activates for a new game
  startGameButton.disabled = false;
  // Letter buttons are disabled
  for (i = 0; i < letterButtons.length; i++) {
    letterButtons[i].disabled = true;
  }
  // Message with the game time
  messageElement.innerHTML +=
    "<br>Speltid: " + runTime.toFixed(1) + " sekunder.";
}
