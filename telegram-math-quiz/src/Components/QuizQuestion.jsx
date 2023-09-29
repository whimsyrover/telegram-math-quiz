import React, { useState } from 'react';

function QuizQuestion({ question, options = [], correctAnswerIndex }) {
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const isAnswerCorrect = selectedAnswerIndex === correctAnswerIndex;

    const handleAnswerClick = (index) => {
        setSelectedAnswerIndex(index);
    };

    return (
        <div class="space-y-4 justify-center">
        <p class="text-xl">{question}</p>
        
        <ul class="space-y-2">
            {options.map((option, index) => (
            <li
                key={index}
                onClick={() => handleAnswerClick(index)}
                style={{
                    color: isAnswerCorrect
                      ? index === correctAnswerIndex
                        ? 'green'
                        : 'initial'
                      : index === selectedAnswerIndex
                      ? 'red'
                      : 'initial',
                    cursor: 'pointer',
                  }}
                class="flex items-center"  
            >
                {option}
            </li>
            ))}
        </ul>

        {selectedAnswerIndex !== null && (
            <p class="text-sm text-sky-900">
            {isAnswerCorrect ? 'Correct! 🎉' : 'Incorrect 🙅‍♀️'} The correct answer is {options[correctAnswerIndex]}.
            </p>
        )}

        </div>
    )
}

export default QuizQuestion;