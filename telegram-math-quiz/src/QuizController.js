class Question {
    constructor(question = "", options = [], correctAnswerIndex = null) {
        this.question = question;
        this.options = options;
        this.correctAnswerIndex = correctAnswerIndex;
    }
}

class QuizForm {
    constructor(questions = []) {
        this.questions = questions
        this.length = questions.length
    }
}

export class QuizScore {
    constructor(quizLength) {
        this.quizLength = quizLength
        this.correctAnswers = 0
        this.skippedQuestions = 0
    }

    onSkipQuestion() {
        this.skippedQuestions += 1
    }

    onCorrectAnswers() {
        this.correctAnswers += 1
    }
}

export class QuizController {
    constructor() {
        this.quizzes = [];
        this.setupQuizzes()
        
        this.currentQuiz = this.quizzes[this.setRandomQuiz()]
        this.currentQuestionIndex = 0
    }

    getCurrentQuestion() {
        return this.currentQuiz.questions[this.currentQuestionIndex]
    }

    addQuiz(quiz) {
        this.quizzes.push(quiz);
    }

    setupQuizzes() {
        this.addQuiz(
            new QuizForm([
                new Question("How much is 5% of 200?", ["10", "5", "2.5"], 0),
                new Question("Is it 1/4 equivalent to 25%?", ["true", "false"], 0),
                new Question("Is it 0.1 equivalent to 10%?", ["true", "false"], 0),
                // new Question("Is it 0.01 equivalent to 1%?", ["true", "false"], 0),
                // new Question("How much is 1% of 100?", ["10", "1", "0.1"], 1),
                // new Question("How much is 100 * 0.01 ?", ["10", "1", "0.1"], 1),
                // new Question("How much is 25% of 100?", ["25", "4"], 0),
                // new Question("How much is 25% of 300?", ["50", "75", "100"], 1),
                // new Question("How much is 300 * 0.25?", ["50", "75", "100"], 1),
            ])
        )

        this.addQuiz(
            new QuizForm([
                new Question("What is the value of 3! ?", ["3", "6", "none"], 1),
                new Question("What is the value of 6! ?", ["6", "18"], 0)
            ])
        )
    }

    setRandomQuiz() {
       if (this.quizzes.length === 0) {
          return null
       } else {
          return Math.floor(Math.random() * this.quizzes.length)
       }
    }

    nextQuestion() {
        const nextIndex = this.currentQuestionIndex + 1
        if (nextIndex === this.currentQuiz.length) {
            return null
        } else {
            this.currentQuestionIndex += 1
            this.currentQuestion = this.currentQuiz.questions[nextIndex]
        }
    }
}