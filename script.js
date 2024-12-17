let currentPuzzle = 0;  // Track the puzzle number
let levelIndex = 0;      // Track the current level (Easy -> Medium -> Hard)

let puzzles = {
    easy: [
        { cipher: "PXVWDQJ", answer: "MUSTANG", shift: 3, clue: "Car" },
        { cipher: "KIZZWB", answer: "CARROT", shift: 8, clue: "Vegetable" },
        { cipher: "FDW", answer: "CAT", shift: 3, clue: "Animal" },
        { cipher: "DSSOH", answer: "APPLE", shift: 3, clue: "Fruit" },
        { cipher: "XUFNS", answer: "SPAIN", shift: 5, clue: "Country" }
    ],
    medium: [
        { cipher: "ZOMKX", answer: "TIGER", shift: 6, clue: "Animal" },
        { cipher: "QEVW", answer: "MARS", shift: 4, clue: "Planet" },
        { cipher: "GFSFSF", answer: "BANANA", shift: 5, clue: "Fruit" },
        { cipher: "MXEPC", answer: "ITALY", shift: 4, clue: "Country" },
        { cipher: "YVVZALY", answer: "ROOSTER", shift: 7, clue: "Animal" }
    ],
    hard: [
        { cipher: "KBKXYKZ", answer: "EVEREST", shift: 6, clue: "Mountain" },
        { cipher: "KTTYGFFQQ", answer: "ELEPHANT", shift: 7, clue: "Animal" },
        { cipher: "NJACQ", answer: "EARTH", shift: 9, clue: "Planet" },
        { cipher: "VUZGZU", answer: "POTATO", shift: 6, clue: "Vegetable" }
    ]
};

function startGame() {
    currentPuzzle = 0;
    levelIndex = 0;
    document.querySelector(".cover-page").style.display = "none";
    document.getElementById("mission-page").style.display = "block";

    setTimeout(() => {
        document.getElementById("mission-page").style.display = "none";
        document.getElementById("game-page").style.display = "block";
        loadPuzzle();
    }, 2000);
}

function loadPuzzle() {
    document.getElementById("result").innerText = ""; 

    let currentLevel = getCurrentLevel();
    let puzzle = currentLevel[currentPuzzle];

    document.getElementById("level-info").innerText = `Level ${levelIndex + 1}: Solve the cipher`;
    document.getElementById("cipher-text").innerText = `Cipher: ${puzzle.cipher}`;
    document.getElementById("shift-value").innerText = `Shift: ${puzzle.shift}`;  
    document.getElementById("word-length").innerText = `Length of word: ${puzzle.answer.length}`;

    document.getElementById("clue").innerText = puzzle.clue; 
}

function caesarDecrypt(text, shift) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let decryptedText = "";

    for (let i = 0; i < text.length; i++) {
        let char = text[i].toUpperCase();
        if (alphabet.includes(char)) {
            let index = (alphabet.indexOf(char) - shift + 26) % 26; 
            decryptedText += alphabet[index];
        } else {
            decryptedText += char; 
        }
    }
    return decryptedText;
}

function checkAnswer() {
    let userAnswer = document.getElementById("user-input").value.trim().toUpperCase();

    if (!userAnswer) {
        document.getElementById("result").innerText = "Please enter an answer!";
        return;
    }

    let currentLevel = getCurrentLevel();
    let puzzle = currentLevel[currentPuzzle];

    if (userAnswer === puzzle.answer.toUpperCase()) {
        document.getElementById("result").innerText = "Correct! Moving to the next puzzle.";
        currentPuzzle++;

        document.getElementById("user-input").value = "";

        if (currentPuzzle >= currentLevel.length) {
            levelIndex++;
            currentPuzzle = 0;

            if (levelIndex >= Object.keys(puzzles).length) {
                document.getElementById("diamond").style.display = "block";
                document.getElementById("game-page").style.display = "none";
            } else {
                document.getElementById("game-page").style.display = "none";
                document.getElementById("congratulations-page").style.display = "block";
                document.getElementById("congratulations-page h2").innerText = "Level Complete!";
            }
        } else {
            loadPuzzle();
        }
    } else {
        document.getElementById("result").innerText = "Incorrect, try again!";
    }
}

function proceedToNextLevel() {
    document.getElementById("result").innerText = ""; // Clear result text

    document.getElementById("congratulations-page").style.display = "none";
    document.getElementById("game-page").style.display = "block";

    loadPuzzle();
}

function getCurrentLevel() {
    return puzzles[Object.keys(puzzles)[levelIndex]];
}

function restartGame() {
    levelIndex = 0;
    currentPuzzle = 0;
    document.getElementById("diamond").style.display = "none";
    document.querySelector(".cover-page").style.display = "block";
}