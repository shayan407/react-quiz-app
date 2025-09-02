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
  const [timer, setTimer] = useState(30);

  console.log(questions[number])

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
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    
    if(nextQuestion === totalQuestions){
      setGameProgress(true);
    }else{
      setNumber(nextQuestion);
    }
  };
  const checkAnswers = (e) => {
    if (!gameProgress) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      console.log(answer);
      

      if (correct) setScore((prev) => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };

      setUserAnswers((prev) => [...prev, answerObject]);

      console.log(userAnswers);
      
    }
  };


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
        !gameProgress && !loading && userAnswers.length === number + 1 && number !== totalQuestions - 1 ? <button className="next-question" onClick={nextQuestion}>Next Question</button> : null
      }
    </>
  )
}

export default App
