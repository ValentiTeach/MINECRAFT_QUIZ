document.addEventListener('DOMContentLoaded', () => {

    // ===== Питання на тему Minecraft =====
    const questions = [
        {
            question: "Хто головний бос виміру Енд?",
            answers: ["зомбі гігант", "Дракон Краю", "Іфріт", "Ельдер Стражник"],
            correct: 1
        },
        {
            question: "Кого боїться павук?",
            answers: ["Зомбі", "Скелета", "Вовка", "броненостя"],
            correct: 3
        },
        {
            question: "Скільки блоків піска душ і командних блоків потрібно для візер шторма?",
            answers: ["4 і 2", "3 і 1", "5 і 1", "6 і 3"],
            correct: 1
        },
        {
            question: "У якій вимірності спавняться зомбі коні?",
            answers: ["Незер", "вимір B2", "Енд", "Печери"],
            correct: 1
        }, 
        {
            question: "У якій вимірності спавняться зомбі гігант?",
            answers: ["вимір B12", "вимір B2", "вимір V1", "вимір V12"],
            correct: 1
        },
        {
            question: "хто найрідкісний моб?",
            answers: ["маленька соплива панда", "маленька коричнева панда", "панда", "маленький зомбіселянин на курці"],
            correct: 3
        },
         {
            question: "хто створив Minecraft?",
            answers: ["морква", "chatgpt", "microsoft", "mojang"],
            correct: 3
        },
        {
            question: "шо буде якщо втопити зомбі?",
            answers: ["морква", "нічого", "він вмре", "він стане утоплиником"],
            correct: 3
        },
       {
            question: "шо буде якщо втопити Ендермена?",
            answers: ["морква", "нічого", "він телепортирується", "він стане морквоу"],
            correct: 2
        },
        {
            question: "шо буде якщо засипати зомбі піском?",
            answers: ["він стане пісчаним зомбі", "він стане морквоу", "він вмре", "він стане кітайцем"],
            correct: 0
        }
    ];

    // ===== Отримання елементів =====
    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const scoreDisplay = document.querySelector('#score-display');
    const timerDisplay = document.querySelector('#timer');

    let questionIndex = 0;
    let score = 0;
    let timer = 25;
    let interval;

    // ===== Показ запитання =====
    function showQuestion(question) {
        clearInterval(interval);
        startTimer();

        answersContainer.innerHTML = '';
        questionText.innerText = question.question;

        for (let i = 0; i < question.answers.length; i++) {
            const button = document.createElement('button');
            button.innerText = question.answers[i];
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);
        }
    }

    // ===== Перевірка відповіді =====
    function checkAnswer(button, i) {
        clearInterval(interval);

        if (i === questions[questionIndex].correct) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }

        scoreDisplay.innerText = `💎 Бали: ${score}`;

        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        });

        setTimeout(nextQuestion, 1000);
    }

    // ===== Перехід до наступного запитання =====
    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    // ===== Показ результату =====
    function showResult() {
        clearInterval(interval);
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
    }

    // ===== Старт гри =====
    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        scoreDisplay.innerText = `💎 Бали: 0`;
        showQuestion(questions[questionIndex]);
    }

    // ===== Таймер =====
    function startTimer() {
        timer = 25;
        timerDisplay.innerText = `⏱ Час: ${timer}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `⏱ Час: ${timer}`;
            if (timer <= 0) {
                clearInterval(interval);
                document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
                setTimeout(nextQuestion, 500);
            }
        }, 1000);
    }

    // ===== Слухачі подій =====
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
});
