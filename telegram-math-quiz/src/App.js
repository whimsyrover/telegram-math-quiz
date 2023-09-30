import { useState, useEffect } from "react";
import QuizQuestion from './Components/QuizQuestion.jsx';
import Button from "./Components/Button.jsx";
import QuizController from "./QuizController.js";


function App() {
  // const [cartItems, setCartItems] = useState([]);
  const tele = window.Telegram.WebApp;

  var controller = new QuizController()
  var quizzIndex = controller.currentQuestionIndex
  const quizzLenght = controller.currentQuizz.length

  const [isNextAvailable, setIsNextAvailable] = useState(false)
  // console.log("controller: ", controller)
  // console.log("quizz lenght: ", quizzLenght)

  useEffect(() => {
    tele.ready();
  });
  console.log("Current question: ", controller)

  const onSelectAnswer = () => {
    console.log(">>> on select answer")
    setIsNextAvailable(true)
  }

  const onClickNext = () => {
    console.log(">>> on click next")
    controller.nextQuestion()
    console.log("Next index: ", quizzIndex)
  }

  const onClickSkip = () => {
    console.log(">>> on click skip")
  }

  const handleNextButton = () => {
    if (!isNextAvailable) {
      return null
    } else {
      return <Button 
        title={"Next"} 
        disable={isNextAvailable}
        onClick={onClickNext}
      />
    }
  }

  return (
    <div class="bg-white py-10">
      <div id="quiz-container" class="mx-auto px-6 space-y-16 justify-center items-center">

          <div class="flex flex-col">
            <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">Let's play with</h2>
            <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">✨ Math ✨</h2>
          </div>

          <p>{quizzIndex}/{quizzLenght}</p>

          <QuizQuestion
            question={controller.currentQuestion.question}
            options={controller.currentQuestion.options}
            correctAnswerIndex={controller.currentQuestion.correctAnswerIndex}
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
