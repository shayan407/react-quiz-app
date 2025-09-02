import { useState } from 'react'
import './App.css'
import { QuestionCard } from './components/QuestionCard'
import { fetchQuestions, difficulty, questionState } from './Api'

const totalQuestions = 10


const answerObject = {
  question: "",
  answer: "",
  correct: "",
  correctAnswer: "",
}

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameProgress, setGameProgress] = useState(true);

  console.log(questions)

  const startQuiz = async () => {
    setLoading(true);
    setGameProgress(false);
    const newQuestions = await fetchQuestions(totalQuestions, difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  const nextQuestion = () => {};
  const checkAnswers = (e) => {};


  return (
    <>
      <h1>Quiz</h1>
      {
        gameProgress || userAnswers.length === totalQuestions ? <button className="start-quiz" onClick={startQuiz}>Start Quiz</button> : null
      }
      {
        !gameProgress ? <p className="quiz-score">Score: {score}</p> : null
      }
      {
        loading ? <p className="loading-questions">Loading Questions...</p> : null
      }
      {!loading && !gameProgress && questions.length > 0 ? 
        <QuestionCard 
          questionNum={number + 1}
          totalQuestions={totalQuestions}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswers}
        /> : null}
      {
        !gameProgress && !loading && userAnswers.length === number + 1 && number !== totalQuestions ? <button className="next-question" onClick={nextQuestion}>Next Question</button> : null
      }
    </>
  )
}

export default App
