import React from 'react';

function ScoreView({ score }) {
    const { quizLength, correctAnswers, skippedQuestions } = score
    const {percentage, validQuestions} = makeResult()
    
    function makeResult() {
        const validQuestions = quizLength - skippedQuestions
        const percentage = ((correctAnswers / validQuestions) * 100).toFixed(2)
        return {
            percentage: percentage > 0 ? percentage + "%" : "0%",
            validQuestions: validQuestions
        }
    }

    return (
        <div class="space-y-4 justify-center">
            <p>{`📝 Your scored ${percentage}!`}</p>
            <p>{`Meaning ${correctAnswers} correct of ${validQuestions} answered questions`}</p>
        </div>
    )
}

export default ScoreView;