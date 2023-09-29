import { useState, useEffect } from "react";
import QuizQuestion from './Components/QuizQuestion.js';

// const tele = window.Telegram.WebApp;

function App() {
  // const [cartItems, setCartItems] = useState([]);
  // useEffect(() => {
  //   tele.ready();
  // });

  return (
    <div class="bg-white py-24 sm:py-32 ">
      <div id="quiz-container" class="mx-auto px-32 space-y-16 justify-center items-center">

          <div class="flex flex-col">
            <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">Let's play with</h2>
            <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">✨ Math ✨</h2>
          </div>

          <QuizQuestion
            question={"What is the capital of France?"}
            options={["Berlin", "London", "Paris", "Madrid"]}
            correctAnswerIndex={2}
          />
      </div>
    </div>
    
  );
}

export default App;
