import axios from "./axiosInstance";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    if (userId && secretCode !== "") {
      fetchQuiz();
    }
  }, [userId]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.post(
        `/api/quizzes/getQuizById/${id}`,
        { secretCode },
        { headers: { "Content-Type": "application/json" } }
      );
      const data = response.data;
      setQuiz(data);
      setUserAnswers({});
    } catch (error) {
      console.error("Error fetching quiz", error);
    }
  };

  const handleUserInfoSubmit = async (e: any) => {
    e.preventDefault();
    axios
      .post("/api/quizzes/createUser", userInfo, {
        headers: { "Content-Type": "application/json" },
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
    const finalScore = quiz ? (correctAnswers / quiz.questions.length) * 100 : 0;
    setScore(finalScore);

    axios
      .post(
        `/api/quizzes/${id}/submit`,
        { userId, answers: userAnswers, score: finalScore },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        alert("Quiz submitted successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error submitting quiz result", error);
      });
  };

  if (!userId) {
    return (
      <div className="container mx-auto p-8 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Enter Your Information</h1>
          <form onSubmit={handleUserInfoSubmit} className="space-y-4">
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              value={userInfo.rollNo}
              onChange={(e) => setUserInfo({ ...userInfo, rollNo: e.target.value })}
              placeholder="Roll No"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              value={userInfo.year}
              onChange={(e) => setUserInfo({ ...userInfo, year: e.target.value })}
              placeholder="Year"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Start Quiz
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto p-8 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Enter Secret Code</h1>
          <input
            type="text"
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            placeholder="Secret Code"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            onClick={fetchQuiz}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">{quiz.title}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {quiz.questions.map((question) => (
            <div key={question.id} className="space-y-2">
              <p className="font-semibold text-lg">{question.question}</p>
              {question.options.split(",").map((option, index) => (
                <label key={index} className="block p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
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
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Submit Answers
          </button>
        </form>
        {score !== null && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-center text-gray-700">
              Your Score: {score.toFixed(2)}%
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
