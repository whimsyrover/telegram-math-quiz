import { useState, useEffect } from "react";
import QuizQuestion from './Components/QuizQuestion.jsx';
import Button from "./Components/Button.jsx";
import { QuizController, QuizScore } from "./QuizController.js";
import ScoreView from "./Components/ScoreView.jsx";

const controller = new QuizController()
const score = new QuizScore(controller.currentQuiz.length)

function App() {
  const tele = window.Telegram.WebApp;

  // --- Quiz Controller ---
  const quizLenght = controller.currentQuiz.length
  const [quizIndex, setQuizIndex] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState(controller.getCurrentQuestion())
  const [isNextAvailable, setIsNextAvailable] = useState(false)
  const [isPresentingResults, setIsPresentingResults] = useState(false)

  // --- Side Effects ---
  useEffect(() => {
    tele.ready();
  });

  useEffect(() => {
    setQuizIndex(controller.currentQuestionIndex + 1)
  }, [currentQuestion]);

  // --- Actions ---
  const onSelectAnswer = (isAnswerCorrect) => {
    setIsNextAvailable(true)
    if (isAnswerCorrect) {
      score.onCorrectAnswers()
    }
  }

  const onClickNext = () => {
    controller.nextQuestion()
    setCurrentQuestion(controller.getCurrentQuestion())
    setIsNextAvailable(false)
  }

  const onClickSkip = () => {
    onClickNext()
    score.onSkipQuestion()
    if (quizIndex === quizLenght) {
      setIsNextAvailable(true)
    }
  }

  const onClickResults = () => {
    setIsPresentingResults(true)
  }

  const handleNextButton = () => {
    if (!isNextAvailable) {
      return null
    } if (quizIndex === quizLenght) {
      return <Button 
        title={"Results"}
        isPrimary={true}
        onClick={onClickResults}
      />
    } else {
      return <Button 
        title={"Next"} 
        isPrimary={true}
        onClick={onClickNext}
      />
    }
  }

  const handleMainScreen = () => {
    if (isPresentingResults) {
      return <ScoreView score={score}/>
    } else {
      return <div class="space-y-8">
        <QuizQuestion
              question={currentQuestion.question}
              options={currentQuestion.options}
              correctAnswerIndex={currentQuestion.correctAnswerIndex}
              onSelectAnswer={onSelectAnswer}
            />

            <div class="flex flex-row space-x-24">
              <Button 
                title={"Skip"}
                onClick={onClickSkip}
              />
              {handleNextButton()}
            </div>
      </div>

    }
  }

  // --- Render UI ---
  return (
    <div class="bg-white py-10">
      <div id="quiz-container" class="mx-auto px-6 space-y-8 justify-center items-center">

          <div class="flex flex-col">
            <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">Let's play with</h2>
            <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">✨ Math ✨</h2>
          </div>

          <p>{quizIndex}/{quizLenght}</p>
          
          {handleMainScreen()}

      </div>
    </div>
  );
}

export default App;
