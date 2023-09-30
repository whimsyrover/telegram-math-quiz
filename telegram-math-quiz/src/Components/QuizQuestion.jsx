import React, { useState, useEffect } from 'react';

function QuizQuestion({ question, options = [], correctAnswerIndex, onSelectAnswer = () => {} }) {
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const isAnswerCorrect = selectedAnswerIndex === correctAnswerIndex;

    useEffect(() => {
        setSelectedAnswerIndex(null);
    }, [question]);

    const handleAnswerClick = (index) => {
        setSelectedAnswerIndex(index);
        onSelectAnswer()
    };

    return (
        <div class="space-y-4 justify-center">
        <p class="text-base">{question}</p>
        
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
            >
                {option}
            </li>
            ))}
        </ul>

        {selectedAnswerIndex !== null && (
            <p class="text-sm text-sky-900">
            { isAnswerCorrect 
              ? 'Correct! 🎉' 
              : `Incorrect 🙅‍♀️ The correct answer is ${options[correctAnswerIndex]}.`
            }
            </p>
        )}

        </div>
    )
}

export default QuizQuestion;