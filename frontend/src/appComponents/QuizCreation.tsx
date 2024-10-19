import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axiosInstance";
import { useAuth } from "../context/AuthContext";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const QuizCreation: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);
  const [secretCode, setSecretCode] = useState<string>("");
  const [clubInfo, setClubInfo] = useState<any>("");
  const navigate = useNavigate();
  const { userData } = useAuth();

  useEffect(() => {
    if (userData) {
      setClubInfo(userData?.Club);
      fetchQuizzes();
      console.log(clubInfo);
      console.log(quizzes);
    }
  }, [userData]);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(
        `/api/quizzes/getClubQuizzes?ClubID=${userData?.ClubID}`
      );
      if (response.status === 200) {
        setQuizzes(response.data);
      }
    } catch (error) {
      console.error("Error fetching quizzes", error);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[index] = {
      ...newQuestions[index],
      [field]: value,
    };
    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formattedQuestions = questions.map((q) => ({
        ...q,
        options: q.options.join(","),
      }));

      const response = await axios.post(
        `/api/quizzes/createQuiz?ClubID=${userData?.ClubID}`,
        {
          title,
          questions: formattedQuestions,
          secretCode,
        }
      );
      navigate(`/quiz/${response.data.quizId}`);
    } catch (error) {
      console.error("Failed to create quiz", error);
    }
  };

  return (
    <div className="bg-black w-full overflow-scroll">
      <div className="mx-auto mt-3 mb-8 p-6 bg-[#6284eb] shadow-lg rounded-lg w-full max-w-2xl">
        <h1 className="text-3xl text-white font-bold mb-6  text-center">Create New Quiz</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Quiz Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="space-y-2">
              <input
                type="text"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "question", e.target.value)
                }
                placeholder={`Question ${qIndex + 1}`}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
              {q.options.map((option, oIndex) => (
                <input
                  key={oIndex}
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  placeholder={`Option ${oIndex + 1}`}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              ))}
              <input
                type="text"
                value={q.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "correctAnswer", e.target.value)
                }
                placeholder="Correct Answer"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
          ))}
          <div className="mx-40">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="w-full bg-black text-white px-4 py-2  rounded-lg transition duration-200 hover:bg-gray-800"
          >
            Add Question
          </button>
          </div>
          <input
            type="text"
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            placeholder="Secret Code"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <div className="mx-40">
          <button
            type="submit"
            className="w-full bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-green-700"
          >
            Create Quiz
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizCreation;
