import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const QuizCreation: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);
  const [secretCode, setSecretCode] = useState<string>("");
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string,
  ) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string,
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Convert options array into a string
      const formattedQuestions = questions.map((q) => ({
        ...q,
        options: q.options.join(","),
      }));

      const response = await axios.post("http://localhost:4000/api/quizzes", {
        title,
        questions: formattedQuestions,
        secretCode,
      });
      navigate(`/quiz/${response.data.quizId}`);
    } catch (error) {
      console.error("Failed to create quiz", error);
    }
  };

  return (
    <div
      className="mx-auto p-4 overflow-scroll bg-slate-500 rounded-tl-2xl w-full"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <h1 className="text-2xl font-bold mb-4 text-white">Create New Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quiz Title"
          className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
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
                className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Question
        </button>
        <input
          type="text"
          value={secretCode}
          onChange={(e) => setSecretCode(e.target.value)}
          placeholder="Secret Code"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizCreation;
