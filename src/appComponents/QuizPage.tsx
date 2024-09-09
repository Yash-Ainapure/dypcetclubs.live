import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

interface Option {
  value: string;
  label: string;
}

interface Question {
  id: string;
  question: string;
  options: string;
  correctAnswer: string;
}

interface Quiz {
  title: string;
  questions: Question[];
}

export default function QuizPage() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [secretCode, setSecretCode] = useState<string>("");
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const { id } = useParams<{ id: string }>();

  const fetchQuiz = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/quizzes/${id}`,
        { secretCode },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = response.data;
      console.log("data");
      console.log(data);
      setQuiz(data);
      setUserAnswers({});
    } catch (error) {
      console.error("Error fetching quiz", error);
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (quiz) {
      let correctAnswers = 0;
      quiz.questions.forEach((question) => {
        if (userAnswers[question.id] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      setScore((correctAnswers / quiz.questions.length) * 100);
    }
  };

  if (!quiz) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Enter Secret Code</h1>
        <input
          type="text"
          value={secretCode}
          onChange={(e) => setSecretCode(e.target.value)}
          placeholder="Secret Code"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={fetchQuiz}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {quiz.questions.map((question) => (
          <div key={question.id} className="space-y-2">
            <p className="font-semibold">{question.question}</p>
            {question.options.split(",").map((option, index) => (
              <label key={index} className="block">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  onChange={() => handleAnswerChange(question.id, option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit Answers
        </button>
      </form>
      {score !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Your Score: {score.toFixed(2)}%</h2>
        </div>
      )}
    </div>
  );
}
