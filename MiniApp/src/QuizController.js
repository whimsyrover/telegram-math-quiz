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
                new Question("Is it 1/4 equivalent to 25%?", ["true", "false"], 0),
                new Question("Is it 0.1 equivalent to 10%?", ["true", "false"], 0),
                new Question("Is it 0.013 equivalent to 13%?", ["true", "false"], 1),
                
                new Question("How much is 5% of 200?", ["0.10", "10", "2.5"], 1),
                new Question("How much is 100 * 0.01 ?", ["10", "1", "0.1"], 1),
                new Question("How much is 1/4 of 100?", ["20", "0.25", "25"], 2),

                new Question("How much is 25% of 300?", ["50", "75", "100"], 1),
                new Question("How much is 300 * 0.25?", ["50", "75", "100"], 1),
                new Question("If a car travels 180 km in 3 hours, what is its speed in kilometers per hour?", ["30 km/h", "60 km/h", "90 km/h"], 1),

                new Question("If a phone plan costs $30 per month, how much will it cost for 6 months?", ["$150", "$210", "$180"], 2)
            ])
        )

        this.addQuiz(
            new QuizForm([
                new Question("How much is 5% of 100?", ["0.05", "0.5", "5"], 2),
                new Question("How much is 5% of 200?", ["0.10", "10", "2.5"], 1),
                new Question("How much is 10% of 200?", ["0.20", "20", "5"], 1),

                new Question("How much is 15% of 200?", ["0.30", "30", "13.3"], 1),
                new Question("How much is 200 * 0.15?", ["0.30", "30", "13.3"], 1),
                new Question("How much is 1/4 of 200?", ["25", "0.25", "50"], 2),

                new Question("How much is 25% of 400?", ["50", "100", "16"], 1),
                new Question("25% of 100 is 25, so 25% of 400 is equal to 25 * 4 = 100. Is this true?", ["yes", "no"], 0),
                new Question("A recipe calls for 2 cups of flour to make 24 cookies. How many cups of flour are needed to make 36 cookies?", ["3 cups", "4 cups", "2.5 cups"], 0),
            ])
        )

        this.addQuiz(
            new QuizForm([
                new Question("How much is 25 * 0.05?", ["1.25", "5.00", "2.50"], 0),
                new Question("How much is 5% of $25?", ["$1.25", "$5.00", "$2.50"], 0),
                new Question("How much is 1.25 * 3?", ["3.75", "4.00", "4.50"], 0),

                new Question("You want to leave a 15% tip on a $25 restaurant bill. How much should you tip?", ["$3.75", "$4.00", "$4.50"], 0),
                new Question("Sara ran 4km in 30 minutes. How long will it take her to run 6km at the same speed?", ["15 minutes", "45 minutes", "1 hour"], 1),
                new Question("If 5 apples cost $2.50, how much do 12 apples cost?", ["$6.00", "$7.20", "$10.00"], 0),

                new Question("A recipe calls for 2 cups of flour to make 24 cookies. How many cups of flour are needed to make 36 cookies?", ["3 cups", "4 cups", "2.5 cups"], 0),
                new Question("If a car travels 180 km in 3 hours, what is its speed in kilometers per hour?", ["60 km/h", "30 km/h", "90 km/h"], 0),
                new Question("How much is 20% of 10?", ["0.2", "2", "5"], 1),

                new Question("You have a coupon for 20% off a $40 shirt. How much money will you spend using the coupon?", ["$8.00", "$6.00", "$32.00"], 2),
                new Question("If a recipe calls for 2/3 cup of sugar, and you want to make half the recipe, how much sugar do you need?", ["1/6 cup", "1/3 cup", "1/2 cup"], 1),
                new Question("If a phone plan costs $30 per month, how much will it cost for 6 months?", ["$180", "$150", "$210"], 0)
            ])
        )

        this.addQuiz(
            new QuizForm([
                new Question("In how many ways can you arrange the letters of the word 'MATH'?", ["6", "12", "24"], 2),
                new Question("If you have 5 different books and you want to choose 2 to read, how many combinations are possible?", ["5", "10", "15"], 1),
                new Question("How many different ways can you arrange the numbers 1 to 5 in a sequence?", ["60", "120", "240"], 1),

                new Question("If you have 8 different toppings for your pizza and you can choose 3, how many different pizzas can you create?", ["8", "24", "56"], 2),
                new Question("If you have 6 different flavors of ice cream and you want to choose 2, how many flavor combinations can you make?", ["12", "15", "18"], 1)
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