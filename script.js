// Elementos del DOM
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const quizContainer = document.querySelector('.quiz-container');
const resultContainer = document.getElementById('result');
let currentQuestion = 0;
let score = 0;

// Iniciar el quiz
startBtn.addEventListener('click', function() {
    startScreen.style.display = 'none';  // Ocultamos la pantalla inicial
    quizContainer.style.display = 'block';  // Mostramos el quiz
    showQuestion(currentQuestion);
});

// Mostrar la pregunta actual
function showQuestion(index) {
    const questions = document.querySelectorAll('.question');
    questions.forEach((question, i) => {
        question.style.display = i === index ? 'block' : 'none';
    });
}

// Comprobar respuesta
function checkAnswer(button, isCorrect) {
    if (isCorrect) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('incorrect');
    }

    // Deshabilitar botones después de hacer clic
    const buttons = button.parentNode.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.disabled = true;
    });

    // Esperar 1 segundo y mostrar la siguiente pregunta
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < document.querySelectorAll('.question').length) {
            showQuestion(currentQuestion);
        } else {
            showResult();
        }
    }, 1000);
}

// Mostrar resultado final
function showResult() {
    let message = '';
    if (score > 3) {
        message = `¡Increíble! 🎉 Has superado el desafío con una puntuación de ${score} de ${document.querySelectorAll('.question').length}! 😎`;
    } else {
        message = `¡Buen intento! 💪 Tu puntuación es ${score} de ${document.querySelectorAll('.question').length}.`;
    }

    resultContainer.innerHTML = `
        <h2>¡Finalizaste las preguntas! 🎉</h2>
        <p>${message}</p>
    `;
}



