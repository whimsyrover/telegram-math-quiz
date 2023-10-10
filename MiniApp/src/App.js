import { useState, useEffect } from "react";
import QuizQuestion from './Components/QuizQuestion.jsx';
import Button from "./Components/Button.jsx";
import { QuizController, QuizScore } from "./QuizController.js";
import { ScoreView, getTextualScore } from "./Components/ScoreView.jsx";

const controller = new QuizController()
const score = new QuizScore(controller.currentQuiz.length)
const miniApp = window.Telegram.WebApp

function App() {
  // --- Quiz Controller ---
  const quizLenght = controller.currentQuiz.length
  const [quizIndex, setQuizIndex] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState(controller.getCurrentQuestion())
  const [isNextAvailable, setIsNextAvailable] = useState(false)
  const [isPresentingResults, setIsPresentingResults] = useState(false)

  const userName = miniApp.initDataUnsafe?.user?.first_name || "Friend"
  
  // --- Side Effects ---
  useEffect(() => {
    miniApp.ready();
    miniApp.expand();
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

  // TODO: make it work
  const sendResultsToBot = () => {
    let result = getTextualScore(score)
    apiRequest(result)
  }

  const handleMainScreen = () => {
    if (isPresentingResults) {
      return <div class="flex flex-col space-y-8">
      <ScoreView score={score}/>
      <div class="flex bg-indigo-500/30 p-2 rounded-lg grid justify-items-center">
        <a class="text-sm" href="javascript:Telegram.WebApp.openLink('https://github.com/MaisaMilena/telegram-math-quiz');">
          Check this Mini App on GitHub 👩‍💻
        </a>
      </div>
      <Button 
        title={"Save results to chat"}
        onClick={sendResultsToBot}
      />
      </div>
      
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
            <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">{`${userName}, let's`}</h2>
            <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">✨ play with Math ✨</h2>
          </div>

          <p>{quizIndex}/{quizLenght}</p>
          
          {handleMainScreen()}

      </div>
    </div>
  );
}

// TODO: make it work
function apiRequest(data, onCallback) {
  const authData = miniApp.initData || miniApp.initDataUnsafe || '';
  console.log("Authdata: ", authData)
  const URL = `https://02f5-2804-14d-b084-8d98-a940-abce-713d-9acf.ngrok-free.app/sendMessage`
  const body = JSON.stringify(Object.assign(data, {
      _auth: authData,
      method: "sendMessage",
  }))
  console.log("Body: ", body)
    fetch(URL, {
        method: 'POST',
        body: body,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        return response.json();
    }).then(function(result) {
        onCallback && onCallback(result);
    }).catch(function(error) {
        onCallback && onCallback({error: 'Server error'});
    });
}

export default App;
