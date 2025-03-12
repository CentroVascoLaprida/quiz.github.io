// Elementos del DOM
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const quizContainer = document.querySelector('.quiz-container');
const resultContainer = document.getElementById('result');
const instagramLink = document.querySelector('a[href="https://www.instagram.com/centrovascolagunenetxea/"]');
let currentQuestion = 0;
let score = 0;

// Sumar punto extra si se hace click en el link de Instagram
instagramLink.addEventListener('click', () => {
    if (score < document.querySelectorAll('.question').length) {  // Solo sumar el punto si no se ha respondido correctamente a todas las preguntas
        score++;
    }
});

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
    const totalQuestions = document.querySelectorAll('.question').length;

    // Asegurarse de que el puntaje no sea mayor al número de preguntas
    if (score > totalQuestions) {
        score = totalQuestions;
    }

    let message = '';

    if (score === totalQuestions) {
        message = `¡Perfecto! 🎯 Has acertado todas las preguntas. ¡Eres un verdadero experto!`;
    } else if (score >= 8) {
        message = `¡Increíble! 🎉 Has superado el desafío con una puntuación de ${score} de ${totalQuestions}. 😎`;
    } else if (score >= 6) {
        message = `¡Muy bien! 👏 Tienes una buena base de conocimiento con una puntuación de ${score} de ${totalQuestions}.`;
    } else if (score === 5) {
        message = `¡Bien hecho! 👍 Has respondido la mitad de las preguntas correctamente con una puntuación de ${score} de ${totalQuestions}.`;
    } else if (score >= 3) {
        message = `¡Sigue así! 💪 Aún puedes aprender más, obtuviste ${score} de ${totalQuestions}.`;
    } else if (score === 2) {
        message = `¡Ánimo! 🌟 Conseguiste ${score} de ${totalQuestions}. ¡Sigue practicando!`;
    } else if (score === 1) {
        message = `¡No te desanimes! 🌼 Lograste ${score} de ${totalQuestions}. ¡La práctica hace al maestro!`;
    } else {
        message = `¡Sigue intentándolo! 🚀 No acertaste ninguna esta vez, pero la próxima será mejor.`;
    }

    resultContainer.innerHTML = `
        <h2>¡Finalizaste las preguntas! 🎉</h2>
        <p>${message}</p>
    `;
}
