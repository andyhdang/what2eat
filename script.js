const foodArray = [
    {
        name: "sushi",
        score: 0,
        image: "images/sushi.jpg",
    },
    {
        name: "pasta",
        score: 0,
        image: "images/pasta.jpg",
    },
    {
        name: "tacos",
        score: 0,
        image: "images/tacos.jpg",
    },
    {
        name: "fried chicken",
        score: 0,
        image: "images/fried-chicken.jpg",
    },
    {
        name: "burgers",
        score: 0,
        image: "images/burgers.jpg",
    },
    {
        name: "pizza",
        score: 0,
        image: "images/pizza.jpg",
    },


]


const quizData = [
    {
        question: "Which would you rather eat right now?",
        a: foodArray[0].name,
        b: foodArray[1].name,
    },

    {
        question: "Which would you rather eat right now?",
        a: foodArray[2].name,
        b: foodArray[0].name,
    },

    {
        question: "Which would you rather eat right now?",
        a: foodArray[0].name,
        b: foodArray[3].name,
    },
    {
        question: "Which would you rather eat right now?",
        a: foodArray[4].name,
        b: foodArray[0].name,
    },
    {
        question: "Which would you rather eat right now?",
        a: foodArray[0].name,
        b: foodArray[5].name,
    },
    {
        question: "Which would you rather eat right now?",
        a: foodArray[1].name,
        b: foodArray[2].name,
    },
    {
        question: "Which would you rather eat right now?",
        a: foodArray[3].name,
        b: foodArray[1].name,
    },
    {
        question: "Which would you rather eat right now?",
        a: foodArray[1].name,
        b: foodArray[4].name,
    },
    {
        question: "Which would you rather eat right now?",
        a: foodArray[5].name,
        b: foodArray[1].name,
    },
    {
        question: "Which would you rather eat right now?",
        a: foodArray[2].name,
        b: foodArray[3].name,
    },
    {
        question: "Which would you rather eat right now?",
        a: foodArray[4].name,
        b: foodArray[2].name,
    },
    {
        question: "Which would you rather eat right now?",
        a: foodArray[2].name,
        b: foodArray[5].name,
    },
    {
        question: "Which would you rather eat right now?",
        a: foodArray[3].name,
        b: foodArray[4].name,
    },
    {
        question: "Which would you rather eat right now?",
        a: foodArray[5].name,
        b: foodArray[3].name,
    },
    {
        question: "Which would you rather eat right now?",
        a: foodArray[4].name,
        b: foodArray[5].name,
    },

];

shuffle(quizData)

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll(".answer") //this is grabbing all elements with class answer
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text') //this is grabbing all elements with id a_text
const b_text = document.getElementById('b_text')
const submitBtn = document.getElementById('submit') //this is grabbing all elements with id submit

const imgEls = document.querySelectorAll(".image")
const a_img = document.getElementById('a_img')
const b_img = document.getElementById('b_img')

const barEl = document.getElementById('myBar')

let currentQuiz = 0


loadQuiz()

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function loadQuiz() {
    deslectAnswers() //deselect all answers from previous question

    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b

    for (let i = 0; i < foodArray.length; i++) {
        if (currentQuizData.a == foodArray[i].name) {
            a_img.src = foodArray[i].image;
        }
    }

    for (let i = 0; i < foodArray.length; i++) {
        if (currentQuizData.b == foodArray[i].name) {
            b_img.src = foodArray[i].image;
        }
    }
}

function deslectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false) //uncheck each answer element

}

function getSelected() {
    let answer

    answerEls.forEach(answerEl => { //go through each answer element. if it is checked then answer is that elements id
        if (answerEl.checked) {
            answer = quizData[currentQuiz][answerEl.id]
        }
    })

    return answer

}

function compare(a, b) {
    return b.score - a.score
}

submitBtn.addEventListener('click', () => { //when the submit button is clicked get the answer
    const answer = getSelected()

    if (answer == "sushi") {
        foodArray[0].score += 1;
    } else if (answer == "pasta") {
        foodArray[1].score += 1;
    } else if (answer == "tacos") {
        foodArray[2].score += 1;
    } else if (answer == "fried chicken") {
        foodArray[3].score += 1;
    } else if (answer == "burgers") {
        foodArray[4].score += 1;
    } else if (answer == "pizza") {
        foodArray[5].score += 1;
    }

    currentQuiz++

    if (currentQuiz < quizData.length) {
        loadQuiz()
    } else {

        foodArray.sort(compare);
        console.log(foodArray);

        quiz.innerHTML = `
        <h2> Looks like you're craving: </h2>
        <h2> ${foodArray[0].name} </h2>
        <img src="${foodArray[0].image}" alt="${foodArray[0].name}">
        <!--
        <h4>Need options?</h4>
        <h4> Plan A: ${foodArray[0].name} </h4>
        <h4> Plan B: ${foodArray[1].name} </h4>
        <h4> Plan C: ${foodArray[2].name} </h4>
        -->

        <button onclick="location.reload()">Reload</button>
        `
    }

})

