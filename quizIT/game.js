const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestion =[]

let questions = [
	{
		question: "Do you have something in your mind?",
			choice1: "probably",
			choice2: "Im tired",
			choice3: "Im holding",
			choice4: "I can barely see the light",
			answer: 2,
	},

	{
		 question: "Biggest mistake do you have",
			choice1: "my life fucked up",
			choice2: '5-10%',
			choice3: '15-20%',
			choice4: '30%-40%',
			answer: 1,
	},

	{
		  question: "Do you eat lumpia?",
			choice1: '10-20%',
			choice2: '5-10%',
			choice3: '15-20%',
			choice4: '30%-40%',
			answer: 3,
	},

	{
		 question: "Approximately what percent of U.S. power outages are caused by squirels?",
			choice1: '10-20%',
			choice2: '5-10%',
			choice3: '15-20%',
			choice4: '30%-40%',
			answer: 3,
	}
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {

	questionCounter = 0
	score = 0
	availableQuestion = [...questions]
	getNewQuestion()
}



getNewQuestion = () => {

	if(availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS){
		localStorage.setItem('mostRecentScore', score)

		return window.location.assign('end.html')
	}

	questionCounter++
	progressText.innerText = `Questiom ${questionCounter} of ${MAX_QUESTIONS}`
	progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) *100}%`

	const questionsIndex = Math.floor(Math.random()* availableQuestion.length)
	currentQuestion = availableQuestion[questionsIndex]
	question.innerText = currentQuestion.question

	choices.forEach(choice => {
		const number = choice.dataset['number']
		choice.innerText = currentQuestion['choice' + number]
	})

	availableQuestion.splice(questionsIndex, 1)

	acceptingAnswers = true

}

choices.forEach(choice => {
	choice.addEventListener('click', e => {
		if(!acceptingAnswers) return

		acceptingAnswers = false
		const selectedChoice = e.target 
		const selectedAnswer = selectedChoice.dataset['number']

		let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

		if(classToApply === 'correct'){

			incrementScore(SCORE_POINTS)

		}


		selectedChoice.parentElement.classList.add(classToApply)

		setTimeout(() => {

				selectedChoice.parentElement.classList.remove(classToApply)
				getNewQuestion()

		}, 1000)

	})
})


incrementScore = num =>{
	score +=num
	scoreText.innerText = score
}

startGame()
