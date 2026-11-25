// Global variables to track game state, scores, and round history
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let results = [];

// Function to validate player name and start the game
function startGame() {
    const nameInput = document.getElementById("playerName").value.trim();

    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + nameInput + "!";
    document.getElementById("startTime").innerHTML = "Game started on: " + Date();
}

// Function to randomly select rock, paper, or scissors for computer
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Function to play one round and update UI
function playRound(playerChoice) {
    // Check if Start Game was clicked first
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    const computerChoice = getComputerChoice();

    // Update images based on player and computer choices
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    const resultElement = document.getElementById("result");
    let roundResult = "";

    // Determine winner using if...else statements
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
        resultElement.innerHTML = "It's a Draw!";
        resultElement.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundResult = "Win";
        wins++;
        resultElement.innerHTML = "You Win!";
        resultElement.style.color = "green";
    } else {
        roundResult = "Lose";
        losses++;
        resultElement.innerHTML = "You Lose!";
        resultElement.style.color = "red";
    }

    // Update scoreboard numbers
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Store result in array and append new row to history table
    results.push(roundResult);
    const roundNumber = results.length;
    const historyBody = document.getElementById("historyBody");
    historyBody.innerHTML += `
        <tr>
            <td>${roundNumber}</td>
            <td>${playerChoice}</td>
            <td>${computerChoice}</td>
            <td>${roundResult}</td>
        </tr>
    `;
}

// Function to calculate win percentage using a for loop and Math.round()
function showSummary() {
    const totalRounds = results.length;
    if (totalRounds === 0) {
        document.getElementById("summaryText").innerHTML = "No rounds played yet.";
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    const winPercentage = Math.round((winCount / totalRounds) * 100);
    document.getElementById("summaryText").innerHTML = 
        `You played ${totalRounds} rounds and won ${winPercentage}%`;
}

// Function to reset all scores, array, history rows, and messages
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    results = [];

    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("summaryText").innerHTML = "";
}
