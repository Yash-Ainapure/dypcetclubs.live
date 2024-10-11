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
    if (userId && secretCode != "") {
      fetchQuiz();
    }
  }, [userId]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.post(
        `/api/quizzes/getQuizById/${id}`,
        { secretCode },
        {
          headers: { "Content-Type": "application/json" },
        },
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
    const finalScore = quiz
      ? (correctAnswers / quiz.questions.length) * 100
      : 0;
    setScore(finalScore);

    axios
      .post(
        `/api/quizzes/${id}/submit`,
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
      <div className="container mx-auto p-6 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Enter Your Information
          </h1>
          <form onSubmit={handleUserInfoSubmit} className="space-y-6">
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              value={userInfo.rollNo}
              onChange={(e) =>
                setUserInfo({ ...userInfo, rollNo: e.target.value })
              }
              placeholder="Roll No"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              value={userInfo.year}
              onChange={(e) =>
                setUserInfo({ ...userInfo, year: e.target.value })
              }
              placeholder="Year"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
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
      <div className="container mx-auto p-6 min-h-screen flex flex-col items-center justify-center ">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Enter Secret Code
          </h1>
          <input
            type="text"
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            placeholder="Secret Code"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          />
          <button
            onClick={fetchQuiz}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
  <div className="container mx-auto p-6 min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full mx-auto">
      {quiz ? (
        <>
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
            {quiz.title || "Quiz Title"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {quiz.questions.map((question) => (
              <div key={question.id} className="space-y-4">
                <p className="text-xl font-semibold text-gray-800">
                  {question.question || "Untitled Question"}
                </p>
                <div className="space-y-2">
                  {question.options.split(",").map((option, index) => (
                    <label key={index} className="block">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        onChange={() =>
                          handleAnswerChange(question.id, option)
                        }
                        className="mr-2 accent-blue-500"
                        required
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
            >
              Submit Answers
            </button>
          </form>
          {score !== null && (
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Your Score: {score.toFixed(2)}%
              </h2>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-700">Loading Quiz...</h2>
        </div>
      )}
    </div>
  </div>

  );
}
