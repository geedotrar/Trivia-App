import React, { useState, useEffect } from "react";
import "./trivia.css";

const Trivia = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [selectAnswer, setSelectAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [quizStart, setQuizStart] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [selectAnswerCorrect, setSelectAnswerCorrect] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  useEffect(() => {
    const fetchTriviaQuestions = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=3&category=27&difficulty=easy&type=multiple");
        const data = await response.json();
        setQuestions(data.results);
        const totalQuestionsCount = data.results.length;
        setTotalQuestions(totalQuestionsCount);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (quizStart) {
      fetchTriviaQuestions();
    }
  }, [quizStart]);

  useEffect(() => {
    let countTime;

    if (timer > 0 && !gameOver && timerRunning) {
      countTime = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && !gameOver && questions.length > 0) {
      handleNextQuestion(false);
    }

    return () => clearInterval(countTime);
  }, [timer, gameOver, questions, quizStart, timerRunning]);

  const handleStartQuiz = () => {
    setQuizStart(true);
    setTimer(10);
    setTimerRunning(true);
  };

  const handleAnswerClick = (selectAnswer) => {
    if (!gameOver && questions.length > 0) {
      const correctAnswer = questions[currentQuestion].correct_answer;
      const isCorrect = selectAnswer === correctAnswer;

      if (isCorrect) {
        setScore(score + 1);
      }

      setCorrectAnswer(correctAnswer);
      setSelectAnswer(selectAnswer);
      setTimerRunning(false);
      setSelectAnswerCorrect(isCorrect);

      setAnsweredQuestions(answeredQuestions + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(10);
      setSelectAnswer(null);
      setCorrectAnswer(null);
      setTimerRunning(true);
      setSelectAnswerCorrect(false);
    } else {
      setGameOver(true);
    }
  };

  return (
    <div>
      {!quizStart ? (
        <div>
          <h1 className="welcome-header">Welcome to Quiz</h1>
          <button className="start-button" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>
      ) : gameOver ? (
        <div>
          <h1 className="game-over">Game Over</h1>
          <p>
            Total Answers: {answeredQuestions} / {totalQuestions}
          </p>
          <p className="score-correct">Correct Answers: {score}</p>
          <p className="score-wrong">Wrong Answers: {questions.length - score}</p>
        </div>
      ) : (
        <div>
          <h1 className="question-header">Question {currentQuestion + 1}</h1>
          <p className="timer">Remaining: {timer} seconds</p>
          {questions.length > 0 ? (
            <div>
              <p className="question">{questions[currentQuestion].question}</p>
              <ul className="answers">
                {questions[currentQuestion].incorrect_answers.map((answer, index) => (
                  <li key={index}>
                    <button onClick={() => handleAnswerClick(answer)} className={`answer-button ${selectAnswer === answer ? (selectAnswerCorrect ? "correct-answer" : "wrong-answer") : ""}`} disabled={selectAnswer !== null}>
                      {answer}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handleAnswerClick(questions[currentQuestion].correct_answer)}
                    className={`answer-button ${selectAnswer === questions[currentQuestion].correct_answer ? (selectAnswerCorrect ? "correct-answer" : "wrong-answer") : ""}`}
                    disabled={selectAnswer !== null}
                  >
                    {questions[currentQuestion].correct_answer}
                  </button>
                </li>
              </ul>
              {selectAnswer !== null && (
                <p className={selectAnswer === correctAnswer ? "correct-answer-text" : "wrong-answer-text"}>
                  {selectAnswer === correctAnswer ? "Correct!" : "Wrong!"}
                  <br />
                  The correct answer is: {correctAnswer}
                </p>
              )}
              <button onClick={handleNextQuestion}>Next Question</button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Trivia;
