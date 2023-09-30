import { useState, useEffect } from "react";
import QuizQuestion from './Components/QuizQuestion.jsx';
import Button from "./Components/Button.jsx";
import QuizController from "./QuizController.js";

const controller = new QuizController()

function App() {
  const tele = window.Telegram.WebApp;

  // --- Quiz Controller ---
  const quizzLenght = controller.currentQuizz.length
  const [quizIndex, setQuizIndex] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState(controller.getCurrentQuestion())
  const [isNextAvailable, setIsNextAvailable] = useState(false)
  
  // --- Side Effects ---
  useEffect(() => {
    tele.ready();
  });

  useEffect(() => {
    setQuizIndex(controller.currentQuestionIndex + 1)
  }, [currentQuestion]);

  // --- Actions ---
  const onSelectAnswer = () => {
    setIsNextAvailable(true)
  }

  const onClickNext = () => {
    controller.nextQuestion()
    setCurrentQuestion(controller.getCurrentQuestion())
    setIsNextAvailable(false)
  }

  const onClickSkip = () => {
    console.log(">>> on click skip")
  }

  const onClickResults = () => {
    console.log("✨results")
  }

  const handleNextButton = () => {
    if (!isNextAvailable) {
      return null
    } if (quizIndex === quizzLenght) {
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
  
  // --- Render UI ---
  return (
    <div class="bg-white py-10">
      <div id="quiz-container" class="mx-auto px-6 space-y-8 justify-center items-center">

          <div class="flex flex-col">
            <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">Let's play with</h2>
            <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">✨ Math ✨</h2>
          </div>

          <p>{quizIndex}/{quizzLenght}</p>
          
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
    </div>
  );
}

export default App;
