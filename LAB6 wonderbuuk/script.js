// 1. Questions Array
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which CSS property is used to change the background color?",
        options: [
            "color",
            "bgcolor",
            "background-color",
            "canvas-color"
        ],
        answer: "background-color"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: [
            "<js>",
            "<scripting>",
            "<javascript>",
            "<script>"
        ],
        answer: "<script>"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: [
            "msgBox('Hello World');",
            "alert('Hello World');",
            "msg('Hello World');",
            "alertBox('Hello World');"
        ],
        answer: "alert('Hello World');"
    },
    {
        question: "Which operator is used to assign a value to a variable in JavaScript?",
        options: [
            "*",
            "-",
            "=",
            "x"
        ],
        answer: "="
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
let answered = false;

// 2. Randomly shuffles the questions
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// 3. Sets a countdown timer for answering each question
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

// Handles behavior when timer reaches 0
function handleTimeout() {
    if (answered) return;
    answered = true;

    const currentQ = questions[currentQuestionIndex];
    const feedbackSection = document.getElementById("feedback-section");
    const feedbackText = document.getElementById("feedback-text");

    feedbackSection.className = "feedback-incorrect";
    feedbackSection.classList.remove("hidden");
    feedbackText.textContent = `Time's up! The correct answer was: ${currentQ.answer}`;

    disableOptions();
    document.getElementById("submit-btn").classList.add("hidden");
    document.getElementById("next-btn").classList.remove("hidden");
}

// 4. Displays the current question and answer options
function displayQuestion() {
    answered = false;
    const currentQ = questions[currentQuestionIndex];

    document.getElementById("question-progress").textContent = 
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    document.getElementById("question-text").textContent = currentQ.question;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    currentQ.options.forEach((option) => {
        const label = document.createElement("label");
        label.className = "option-label";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz-option";
        radio.value = option;

        const span = document.createElement("span");
        span.textContent = option;

        label.appendChild(radio);
        label.appendChild(span);
        optionsContainer.appendChild(label);
    });

    // Reset UI visibility
    document.getElementById("feedback-section").classList.add("hidden");
    document.getElementById("submit-btn").classList.remove("hidden");
    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("restart-btn").classList.add("hidden");
}

// Disables radio buttons after submission
function disableOptions() {
    const radios = document.querySelectorAll('input[name="quiz-option"]');
    radios.forEach((radio) => {
        radio.disabled = true;
    });
}

// 5. Checks whether the selected answer is correct and updates the score
function checkAnswer() {
    if (answered) return;

    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
    if (!selectedOption) {
        alert("Please select an answer before submitting!");
        return;
    }

    answered = true;
    clearInterval(timerInterval);

    const userAnswer = selectedOption.value;
    const correctAnswer = questions[currentQuestionIndex].answer;
    const feedbackSection = document.getElementById("feedback-section");
    const feedbackText = document.getElementById("feedback-text");

    feedbackSection.classList.remove("hidden");

    if (userAnswer === correctAnswer) {
        score++;
        feedbackSection.className = "feedback-correct";
        feedbackText.textContent = "Correct! Great job.";
    } else {
        feedbackSection.className = "feedback-incorrect";
        feedbackText.textContent = `Incorrect! The correct answer is: ${correctAnswer}`;
    }

    document.getElementById("score-display").textContent = `Current Score: ${score}`;
    disableOptions();

    document.getElementById("submit-btn").classList.add("hidden");
    document.getElementById("next-btn").classList.remove("hidden");
}

// 6. Moves to the next question, resetting the timer and updating the score
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        startTimer();
    } else {
        showFinalResults();
    }
}

// Displays final score at the end of the quiz
function showFinalResults() {
    clearInterval(timerInterval);
    document.getElementById("question-progress").textContent = "Quiz Completed!";
    document.getElementById("timer").textContent = "Time Left: 0s";
    document.getElementById("question-text").textContent = 
        `You scored ${score} out of ${questions.length}!`;
    document.getElementById("options-container").innerHTML = "";
    document.getElementById("feedback-section").classList.add("hidden");
    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("restart-btn").classList.remove("hidden");
    document.getElementById("score-display").textContent = 
        `Final Score: ${score} / ${questions.length}`;
}

// 7. Starts the quiz by shuffling questions, displaying first question, and starting timer
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("score-display").textContent = `Current Score: 0`;
    shuffleQuestions();
    displayQuestion();
    startTimer();
}

// Initialize the quiz when the page loads
window.onload = startQuiz;
