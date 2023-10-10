import React from 'react';

function makeResult(score) {
    const { quizLength, correctAnswers, skippedQuestions } = score

    const validQuestions = quizLength - skippedQuestions
    const percentage = ((correctAnswers / validQuestions) * 100).toFixed(2)
    return {
        percentage: percentage > 0 ? percentage + "%" : "0%",
        validQuestions: validQuestions
    }
}

function getTextualScore(score) {
    const {percentage, validQuestions} = makeResult(score)
    return `📝 Your scored ${percentage}, meaning ${score.correctAnswers} correct of ${validQuestions} answered questions`
}

function ScoreView({ score }) {
    // const { quizLength, correctAnswers, skippedQuestions } = score
    const {percentage, validQuestions} = makeResult(score)
    
    // function makeResult() {
    //     const validQuestions = quizLength - skippedQuestions
    //     const percentage = ((correctAnswers / validQuestions) * 100).toFixed(2)
    //     return {
    //         percentage: percentage > 0 ? percentage + "%" : "0%",
    //         validQuestions: validQuestions
    //     }
    // }

    return (
        <div class="flex flex-col border-2 border-slate-200 rounded-lg p-6">
            <p>{`📝 Your scored ${percentage}!`}</p>
            <p>{`Meaning ${score.correctAnswers} correct of ${validQuestions} answered questions`}</p>
        </div>
    )
}

export { ScoreView, getTextualScore };