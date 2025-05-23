import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axiosInstance";
import { useAuth } from "../context/AuthContext";
import microBG from "../assets/micro1.avif";

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
  // const [AIQuizModal, setAIQuizModal] = useState(true);
  const [AIQuizModalVisible, setAIQuizModalVisible] = useState<boolean>(false);
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    console.log(quizzes, clubInfo, quiz);
    if (userData) {
      setClubInfo(userData?.Club);
      fetchQuizzes();
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
    <div
      className="w-full border-[#bababa] border-l overflow-scroll rounded-tl-2xl"
      style={{
        backgroundImage: `url(${microBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* {
       
      } */}
      <button
        className="bg-white text-black p-2 rounded-md absolute top-4 right-8"
        onClick={() => setAIQuizModalVisible(true)}
      >
        Generate Quiz with AI
      </button>
      {AIQuizModalVisible && (
        <AiQuizCreationModal setQuiz={setQuiz} setQuestions={setQuestions} />
      )}

      <div className="mx-auto mt-3 mb-8 p-6 bg-slate-400 shadow-lg rounded-lg w-full max-w-2xl">
        <h1 className="text-3xl text-white font-bold mb-6  text-center">
          Create New Quiz
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Quiz Title"
            className="w-full p-3 border border-gray-300  rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="space-y-2 bg-blue-100 p-2 rounded-md">
              <div className="p-2 rounded-md">
                <p className="font-bold">Question: </p>
                <textarea
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "question", e.target.value)
                  }
                  placeholder={`Question ${qIndex + 1}`}
                  className="w-full p-3 border font-semibold border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="flex flex-col gap-2 p-2 rounded-md">
                <p className="font-semibold">options: </p>
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
              </div>
              <div className="flex gap-2 justify-center items-center rounded-md pl-2 bg-green-400">
                <p className="font-semibold rounded-md">Answer: </p>
                <input
                  type="text"
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(
                      qIndex,
                      "correctAnswer",
                      e.target.value
                    )
                  }
                  placeholder="Correct Answer"
                  className="w-full p-3 focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
            </div>
          ))}
          <div className="mx-40">
            <button
              type="button"
              onClick={() => {
                handleAddQuestion();
              }}
              className="w-full bg-black text-white font-semibold px-4 py-2  rounded-lg transition duration-200 hover:bg-gray-800"
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
          <div className="mx-20">
            <button
              type="submit"
              className="w-full bg-green-600 font-semibold text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-green-700"
            >
              Create Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AiQuizCreationModal = ({ setQuiz, setQuestions }: any) => {
  const [topic, setTopic] = useState<any>();
  const [level, setLevel] = useState<any>();
  const [numberOfQuestions, setNumberOfQuestions] = useState<any>();
  const [loading, setLoading] = useState(false);
  // const handleQuiz=();
  const handleQuiz = async () => {
    setLoading(true);
    // Create the payload with the user's input
    const payload = {
      topic,
      level,
      numberOfQuestions,
    };

    console.log("Payload:", payload);

    try {
      const response = await axios.post("/api/quizzes/generateQuiz", payload);
      console.log("response", response)
      let data = JSON.parse(response.data?.data?.choices[0]?.message?.content);
      console.log("data", data)

      if (data?.questions) {
        setQuiz(data.questions);
        const formattedQuestions = data.questions.map((q: any) => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.answer,
        }));
        setQuestions(formattedQuestions);
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-white bg-opacity-70 mx-auto mt-3 mb-8 p-6 w-full max-w-lg">
      <input
        placeholder="Topic name"
        className="p-2 border rounded"
        value={topic}
        onChange={(e) => setTopic(e.target.value)} // Store topic input
      />
      <select
        className="p-2 border rounded"
        value={level}
        onChange={(e) => setLevel(e.target.value)} // Store selected level
      >
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>
      <input
        placeholder="Number of questions"
        className="p-2 border rounded"
        value={numberOfQuestions}
        onChange={(e) => setNumberOfQuestions(e.target.value)} // Store number of questions input
      />
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => {
          handleQuiz();
        }} // Trigger quiz generation on click
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>
    </div>
  );
};
export default QuizCreation;