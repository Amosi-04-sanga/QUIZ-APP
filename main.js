// select all references.
const start = document.getElementById('start');
const quiz = document.querySelector('.quiz');
const question = document.getElementById('question');
const qImg = document.getElementById('qImg');
const A = document.getElementById('A');
const B = document.getElementById('B');
const C = document.getElementById('C');

const counter = document.getElementById('counter');
const timeGauge = document.getElementById('timeGauge');

// questions array.
const questions = [

    {
        question: 'HTML is used for ___.',
        choiceA: 'markup',
        choiceB: 'programming',
        choiceC: 'styling',
        imgSrc: './IMAGES/html.png',
        correct: 'A'
    },

    {
        question: 'css is used for__ in web programming',
        choiceA: 'markup',
        choiceB: 'programming',
        choiceC: 'styling',
        imgSrc: './IMAGES/css.png',
        correct: 'C'
    },

    {
        question: '__ is a most popular javascript framework.',
        choiceA: 'react.js',
        choiceB: 'node.js',
        choiceC: 'java',
        imgSrc: './IMAGES/js.png',
        correct: 'A'
    }

];

const questionTime = 10; // 10 seconds.
let questionIndex = 0;
let TIMER;
const numberOfQuestions = questions.length;

// question rander function.
function questionsRander() {

    const currentQn = questions[questionIndex];    
    question.innerHTML = currentQn.question; // javascript.
    qImg.src = currentQn.imgSrc;

    A.textContent = currentQn.choiceA; // choices
    B.textContent = currentQn.choiceB;// choices
    C.textContent = currentQn.choiceC;// choices

}

questionsRander();

TIMER = setInterval( renderProgress, 1000 );
// retrive renderProgress on load.
let count = 0;
renderProgress();

const score = document.getElementById('score-container');
score.textContent = '100%';

// render progress function.
function renderProgress() {

    counter.textContent = count;

    if( counter.textContent.length < 2 ) {
        counter.textContent = '0' + count;
    }

    timeGauge.style.width = count * 10 + '%';

    if( count === 10 && questionIndex === numberOfQuestions - 1 ) {
        clearInterval(TIMER);
        quiz.style.opacity = .4;
        score.classList.add('active');
    }
    
    count++;
    
    if( count > questionTime && questionIndex <= 1 ) {
        count = 0;
      
        // render another question.
        questionIndex++;
        questionsRander();
    }
    

}



