// Master pool of all possible quiz questions
// IMPORTANT: Ensure you have enough unique questions here for multiple rounds without immediate repetition.
const allQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars"
    },
    {
        question: "What is 7 multiplied by 8?",
        options: ["42", "56", "64", "72"],
        correctAnswer: "56"
    },
    {
        question: "Which ocean is the largest?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["O2", "H2O", "CO2", "NACL"],
        correctAnswer: "H2O"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "What is the longest river in the world?",
        options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        correctAnswer: "Nile River"
    },
    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7"
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        correctAnswer: "Vatican City"
    },
    {
        question: "In which year did the first man walk on the moon?",
        options: ["1965", "1969", "1971", "1973"],
        correctAnswer: "1969"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        correctAnswer: "Tokyo"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correctAnswer: "Carbon Dioxide"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        correctAnswer: "Diamond"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "What is the square root of 81?",
        options: ["7", "8", "9", "10"],
        correctAnswer: "9"
    },
    {
        question: "Which country is famous for the Great Wall?",
        options: ["India", "Japan", "China", "Egypt"],
        correctAnswer: "China"
    },
    {
        question: "What is the largest organ in the human body?",
        options: ["Heart", "Brain", "Skin", "Liver"],
        correctAnswer: "Skin"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Cu"],
        correctAnswer: "Au"
    },
    {
        question: "Which sport uses a shuttlecock?",
        options: ["Tennis", "Badminton", "Volleyball", "Squash"],
        correctAnswer: "Badminton"
    },
    {
        question: "What is the highest mountain in Africa?",
        options: ["Mount Everest", "Mount Kilimanjaro", "Mount Elbrus", "Mount Denali"],
        correctAnswer: "Mount Kilimanjaro"
    },
    {
        question: "What is the longest bone in the human body?",
        options: ["Tibia", "Fibula", "Femur", "Humerus"],
        correctAnswer: "Femur"
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["New Zealand", "South Africa", "Australia", "Canada"],
        correctAnswer: "Australia"
    },
    {
        question: "What is the speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "400,000 km/s", "250,000 km/s"],
        correctAnswer: "300,000 km/s"
    },
    {
        question: "Which element has the atomic number 1?",
        options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
        correctAnswer: "Hydrogen"
    }
];

const QUESTIONS_PER_ROUND = 10;

let currentQuestionIndex = 0;
let score = 0;
let selectedOptionElement = null;
let quizQuestionsForRound = [];
let availableQuestions = [];

// Get DOM elements for screens
const startScreen = document.getElementById('start-screen');
const quizMainScreen = document.getElementById('quiz-main-screen');

// Get DOM elements for quiz interaction
const startQuizBtn = document.getElementById('start-quiz-btn');
const quizQuestionsArea = document.getElementById('quiz-questions-area'); // Renamed
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const restartCurrentSetBtn = document.getElementById('restart-current-set-btn');
const tryNewSetBtn = document.getElementById('try-new-set-btn');
const postQuizOptionsDiv = document.querySelector('.post-quiz-options');
const resultDiv = document.getElementById('result');

/**
 * Shuffles an array in place.
 * @param {Array} array The array to shuffle.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Prepares the questions for a new quiz round.
 * @param {boolean} getNewSet - True to get a new random set, false to reuse the current set.
 */
function prepareNewRound(getNewSet) {
    if (getNewSet) {
        if (availableQuestions.length < QUESTIONS_PER_ROUND) {
            console.log("Replenishing available questions pool for new round.");
            availableQuestions = [...allQuestions];
            shuffleArray(availableQuestions);
        }
        quizQuestionsForRound = availableQuestions.splice(0, QUESTIONS_PER_ROUND);
        if (quizQuestionsForRound.length < QUESTIONS_PER_ROUND) {
            console.warn(`Could not get ${QUESTIONS_PER_ROUND} unique questions. Using all available.`);
        }
    }
}

/**
 * Loads and displays the current question and its options.
 */
function loadQuestion() {
    quizQuestionsArea.innerHTML = ''; // Clear previous question content
    resultDiv.classList.add('result-hidden');
    submitBtn.disabled = true;
    selectedOptionElement = null;

    postQuizOptionsDiv.classList.add('hidden');
    submitBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');

    if (currentQuestionIndex < quizQuestionsForRound.length) {
        const currentQuestion = quizQuestionsForRound[currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.textContent = `Q${currentQuestionIndex + 1}: ${currentQuestion.question}`;
        quizQuestionsArea.appendChild(questionElement);

        const optionsList = document.createElement('ul');
        optionsList.classList.add('options');

        const shuffledOptions = [...currentQuestion.options];
        shuffleArray(shuffledOptions);

        shuffledOptions.forEach(option => {
            const optionItem = document.createElement('li');
            optionItem.classList.add('option-item');

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'answer';
            radioInput.value = option;
            radioInput.id = `option-${option.replace(/\s/g, '-')}-${currentQuestionIndex}`;

            const label = document.createElement('label');
            label.htmlFor = `option-${option.replace(/\s/g, '-')}-${currentQuestionIndex}`;
            label.textContent = option;

            optionItem.appendChild(radioInput);
            optionItem.appendChild(label);
            optionsList.appendChild(optionItem);

            optionItem.addEventListener('click', () => {
                if (selectedOptionElement) {
                    selectedOptionElement.classList.remove('selected');
                }
                radioInput.checked = true;
                optionItem.classList.add('selected');
                selectedOptionElement = optionItem;
                submitBtn.disabled = false;
            });
        });
        quizQuestionsArea.appendChild(optionsList);
    } else {
        showResult();
    }
}

/**
 * Displays the final quiz result and post-quiz options.
 */
function showResult() {
    quizQuestionsArea.innerHTML = '';
    submitBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');

    resultDiv.classList.remove('result-hidden');
    resultDiv.innerHTML = `You scored ${score} out of ${quizQuestionsForRound.length}!`;

    if (score === quizQuestionsForRound.length) {
        resultDiv.innerHTML += "<br>Fantastic! You got all of them right!";
    } else if (score >= quizQuestionsForRound.length / 2) {
        resultDiv.innerHTML += "<br>Good job! Keep practicing!";
    } else {
        resultDiv.innerHTML += "<br>You can do better! Keep learning!";
    }

    postQuizOptionsDiv.classList.remove('hidden');
}

/**
 * Checks the user's selected answer against the correct answer.
 */
function checkAnswer() {
    const selectedRadio = document.querySelector('input[name="answer"]:checked');
    if (!selectedRadio) {
        resultDiv.textContent = "Please select an answer!";
        resultDiv.style.color = '#dc3545';
        resultDiv.classList.remove('result-hidden');
        return;
    }

    const userAnswer = selectedRadio.value;
    const currentQuestion = quizQuestionsForRound[currentQuestionIndex];

    const allRadios = document.querySelectorAll('input[name="answer"]');
    allRadios.forEach(radio => radio.disabled = true);
    const allOptionItems = document.querySelectorAll('.option-item');
    allOptionItems.forEach(item => item.style.pointerEvents = 'none');

    allOptionItems.forEach(item => {
        const optionValue = item.querySelector('input').value;
        if (optionValue === currentQuestion.correctAnswer) {
            item.classList.add('correct');
        } else if (optionValue === userAnswer && userAnswer !== currentQuestion.correctAnswer) {
            item.classList.add('incorrect');
        }
        item.classList.remove('selected');
    });

    if (userAnswer === currentQuestion.correctAnswer) {
        score++;
        resultDiv.textContent = "Correct!";
        resultDiv.style.color = '#28a745';
    } else {
        resultDiv.textContent = `Wrong! The correct answer was: ${currentQuestion.correctAnswer}`;
        resultDiv.style.color = '#dc3545';
    }
    resultDiv.classList.remove('result-hidden');

    submitBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
}

/**
 * Advances to the next question or ends the quiz.
 */
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestionsForRound.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

/**
 * Restarts the quiz.
 * @param {boolean} getNewSet - True to get a new random set of questions, false to reuse the current set.
 */
function restartQuiz(getNewSet) {
    prepareNewRound(getNewSet);
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    resultDiv.classList.add('result-hidden');
    resultDiv.style.color = '#333';
}

// --- Screen Transition Logic ---
function showScreen(screenId) {
    const screens = [startScreen, quizMainScreen];
    screens.forEach(screen => {
        if (screen.id === screenId) {
            screen.classList.remove('hidden');
            // Timeout to allow 'hidden' class to apply before removing it, enabling transition
            setTimeout(() => {
                 screen.style.opacity = '1';
                 screen.style.transform = 'translateY(0)';
                 screen.style.visibility = 'visible';
                 screen.style.position = 'static'; // Allow it to occupy space
            }, 10); // Small delay
        } else {
            screen.style.opacity = '0';
            screen.style.transform = 'translateY(20px)';
            screen.style.visibility = 'hidden';
            screen.style.position = 'absolute'; // Remove from flow
            // Note: The 'hidden' class with opacity/transform/visibility/position handles the hiding smoothly.
            // No need to re-add the 'hidden' class if it's already there with transitions.
        }
    });
}


// --- Event Listeners ---
startQuizBtn.addEventListener('click', () => {
    showScreen('quiz-main-screen'); // Show the main quiz screen
    restartQuiz(true); // Start the first round of the quiz with a new set
});
submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', nextQuestion);
restartCurrentSetBtn.addEventListener('click', () => restartQuiz(false));
tryNewSetBtn.addEventListener('click', () => restartQuiz(true));

// --- Initial Setup ---
// On page load, show the start screen
document.addEventListener('DOMContentLoaded', () => {
    showScreen('start-screen'); // Only show the start screen initially
});