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
        correct: 'markup'
    },

    {
        question: 'css is used for__ in web programming',
        choiceA: 'markup',
        choiceB: 'programming',
        choiceC: 'styling',
        imgSrc: './IMAGES/css.png',
        correct: 'styling'
    },

    {
        question: '__ is a most popular javascript framework.',
        choiceA: 'react.js',
        choiceB: 'node.js',
        choiceC: 'java',
        imgSrc: './IMAGES/js.png',
        correct: 'react.js'
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

const scoreWrapper = document.getElementById('score-container');
const score = document.getElementById('score');

const NOTE = document.getElementById('note');
const progress = document.querySelectorAll('.progress-cicle');
let progressIndx = 0;

const choices = document.querySelectorAll('.choice'); 
const choicesArr = Array.from(choices);
choicesArr.forEach( choice => {
     
     choice.addEventListener( 'click', () => {
        // check if ans is correct.
        if( choice.textContent === questions[questionIndex].correct ) {

             answerIsCorrect();

             if( questionIndex === numberOfQuestions - 1 ) {
                 clearInterval(TIMER);
                 quiz.style.opacity = .4;
                 checkAnswer();
             }

             if( questionIndex < numberOfQuestions - 1 ) {
                 questionIndex++;
                 questionsRander();
                 count = 0;
                 progressIndx++;
             }
        }

        else {
            answerIsWrong();
            
            if( questionIndex === numberOfQuestions - 1 ) {
                clearInterval(TIMER);
                quiz.style.opacity = .4;
                checkAnswer();
            }

            if( questionIndex < numberOfQuestions - 1 ) {
                questionIndex++;
                questionsRander();
                count = 0;
                progressIndx++;
            }

            
        }
     });

});



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
        checkAnswer();
    }
    
    // progress.
    if( count === questionTime ) {
        answerIsWrong();
        progressIndx++;
    }
   
    count++;
    
    if( count > questionTime && questionIndex <= 1 ) {
        count = 0;
      
        // render another question.
        questionIndex++;
        questionsRander();

    }
    

}


function answerIsCorrect() {
    progress[progressIndx].style.backgroundColor = 'green';
    progress[progressIndx].classList.add('correct');
}

function answerIsWrong() {
    progress[progressIndx].style.backgroundColor = 'red';
    progress[progressIndx].classList.add('wrong');
}


function checkAnswer() {

    // wrong and correct.
    const wrong = document.querySelectorAll('.wrong');
    const wrongLen = wrong.length;
    const correct = document.querySelectorAll('.correct');
    const correctLen = correct.length;
    const exellent = document.getElementById('exellent');

    scoreWrapper.classList.add('active');         
    
    let marks = Number( (correctLen / numberOfQuestions) * 100 );

    marks = marks.toFixed(1);

    if( correctLen === 3 ) {
        
        exellent.textContent = 'exellent!';

    }

    score.innerText = marks + "%";

}
