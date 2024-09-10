import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  const [userInfo, setUserInfo] = useState({ name: "", rollNo: "", year: "" });
  const [userId, setUserId] = useState(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId && secretCode != "") {
      fetchQuiz();
    } else {
      console.log("userId", userId);
      console.log("secretCode", secretCode);
    }
  }, [userId]);

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

  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/users", userInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const user = response.data;
        setUserId(user.id);
      })
      .catch((error) => {
        console.error("Error creating user", error);
      });
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let correctAnswers = 0;
    quiz?.questions.forEach((question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    const finalScore = (correctAnswers / quiz.questions.length) * 100;
    setScore(finalScore);

    axios
      .post(
        `http://localhost:4000/api/quizzes/${id}/submit`,
        {
          userId,
          answers: userAnswers,
          score: finalScore,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .catch((error) => {
        console.error("Error submitting quiz result", error);
      });
  };

  if (!userId) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Enter Your Information</h1>
        <form onSubmit={handleUserInfoSubmit} className="space-y-4">
          <input
            type="text"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={userInfo.rollNo}
            onChange={(e) =>
              setUserInfo({ ...userInfo, rollNo: e.target.value })
            }
            placeholder="Roll No"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            value={userInfo.year}
            onChange={(e) => setUserInfo({ ...userInfo, year: e.target.value })}
            placeholder="Year"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Start Quiz
          </button>
        </form>
      </div>
    );
  }

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
