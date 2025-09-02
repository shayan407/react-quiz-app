import React from 'react'

const props = {
    question: "",
    answers: [],
    callback: null,
    userAnswer: "",
    questionNum: 0,
    totalQuestions: 0
}

export const QuestionCard = (
    {
        question,
        answers,
        callback,
        userAnswer,
        questionNum,
        totalQuestions
    }
) => {
  return (
    <div className='question-card'>
        <p>
            {questionNum} / {totalQuestions}
        </p>
        <h2>{question}</h2>
        <div>
            {answers.map((ans) => (
                <button className="ans" onClick={() => callback(ans)} disabled={!!userAnswer}>{ans}</button>
            ))}
        </div>
    </div>
  )
}
