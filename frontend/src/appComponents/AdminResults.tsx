import axios from "./axiosInstance";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import microBG from "../assets/micro1.avif";

// TypeScript Interfaces
interface Quiz {
  id: string;
  title: string;
  createdAt: string;
}

interface Result {
  id: string;
  user: {
    name: string;
    rollNo: string;
    year: string;
  };
  score: number;
  createdAt: string;
}

export default function AdminResults() {
  const [sortOption, setSortOption] = useState<string>("");
  const [results, setResults] = useState<Result[]>([]);
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (userData) {
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
      } else {
        console.error("Failed to fetch quizzes");
      }
    } catch (error) {
      console.error("Error fetching quizzes", error);
    }
  };

  const fetchResults = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/quizzes/${id}/results?ClubID=${userData?.ClubID}`
      );
      if (response.status === 200) {
        setResults(response.data);
      } else {
        console.error("Failed to fetch results. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sortOption) {
      sortResults(sortOption);
    }
  }, [sortOption]);

  const sortResults = (option: string) => {
    const sortedResults = [...results];
    switch (option) {
      case "Submission Time":
        sortedResults.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "Score":
        sortedResults.sort((a, b) => b.score - a.score);
        break;
      case "Year":
        sortedResults.sort(
          (a, b) => parseInt(a.user.year, 10) - parseInt(b.user.year, 10)
        );
        break;
      case "Rollno":
        sortedResults.sort(
          (a, b) => parseInt(a.user.rollNo, 10) - parseInt(b.user.rollNo, 10)
        );
        break;
      default:
        break;
    }
    setResults(sortedResults);
  };
  const handleDropdownSelect = (option: string) => {
    setSortOption(option);
    setDropdownOpen(false);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${microBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="p-4 border-[#bababa] border-l bg-slate-400 overflow-y-scroll w-full rounded-tl-2xl rounded-br-2xl"
    >
      <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
      <form className="p-4 flex">
        <label>
          Quiz ID:
          <input
            type="text"
            className="p-2 rounded-md mx-2"
            value={id}
            onChange={handleIdChange}
            placeholder="Enter Quiz ID to get results"
          />
        </label>
        <button
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            fetchResults();
          }}
          className="bg-white p-2 rounded-md text-black font-semibold"
        >
          {loading ? "Fetching..." : "Fetch Results"}
        </button>
        <div className="relative mx-8">
          {results.length > 0 ? (
            <button
              className="bg-black text-white py-2 px-4 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                setDropdownOpen(!dropdownOpen);
              }}
            >
              Sort (A-Z)
            </button>
          ) : null}

          {dropdownOpen && (
            <div className="absolute mt-2 w-48 bg-white shadow-md rounded-md z-10">
              <div
                onClick={() => handleDropdownSelect("Submission Time")}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                By Submission Time
              </div>
              <div
                onClick={() => handleDropdownSelect("Score")}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                By Score
              </div>
              <div
                onClick={() => handleDropdownSelect("Year")}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                By Year
              </div>
              <div
                onClick={() => handleDropdownSelect("Rollno")}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                By Rollno
              </div>
            </div>
          )}
        </div>
      </form>

      <div className="mb-4 flex items-center">
        <button className="text-white font-bold text-lg pl-4"></button>
        <span className="ml-2 font-bold text-xl">Quizzes created by you:</span>
      </div>

      <table className="w-full border-collapse mb-10 rounded-tl-2xl rounded-br-2xl bg-white">
        <thead>
          <tr>
            <th className="p-2 rounded-tl-2xl bg-white">Quiz ID</th>
            <th className="p-2 bg-white">Quiz Name</th>
            <th className="p-2 bg-white">Creation Time</th>
            <th className="p-2 bg-white rounded-tr-2xl">Action</th>
            <th className="p-2 bg-white rounded-tr-2xl">Link</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td className="border bg-white border-gray-300  p-2">
                {quiz.id}
              </td>
              <td className="border bg-white border-gray-300 p-2">
                {quiz.title}
              </td>
              <td className="border border-gray-300 p-2">
                {new Date(quiz.createdAt).toLocaleString()}
              </td>
              <td
                className=" border-t p-2 border-gray-300 cursor-pointer text-red-600 "
                onClick={() => {
                  if (confirm("Are you sure you want to delete this quiz?")) {
                    axios
                      .delete(`/api/quizzes/${quiz.id}`)
                      .then((response) => {
                        if (response.status === 200) {
                          fetchQuizzes();
                        }
                      })
                      .catch((error) => {
                        console.error("Error deleting quiz", error);
                      });
                  }
                }}
              >
                Delete
              </td>
              <td className="border border-gray-300 p-2">
                <div className="flex items-center gap-4">
                  <a
                    className="text-sky-700 mr-2"
                    href={`http://localhost:5173/quiz/${quiz.id}`}
                  >
                    link
                  </a>
                  <button
                    className="bg-gray-200 p-1 rounded"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `http://localhost:5173/quiz/${quiz.id}`
                      );
                      alert("Link copied to clipboard!");
                    }}
                  >
                    Copy
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading ? (
        <p>Loading results...</p>
      ) : results.length > 0 ? (
        <div>
          <h3 className="text-black text-xl font-semibold pl-4 pb-4">
            Quiz Results:
          </h3>

          <table className="w-full border-collapse bg-white rounded-tl-2xl rounded-br-2xl">
            <thead>
              <tr>
                <th className="p-2">User Name</th>
                <th className="p-2">Roll No</th>
                <th className="p-2">Year</th>
                <th className="p-2">Score</th>
                <th className="p-2">Submission Time</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td className="border border-gray-300 p-2">
                    {result.user.name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {result.user.rollNo}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {result.user.year}
                  </td>
                  <td className="border border-gray-300 p-2">{result.score}</td>
                  <td className="p-2 border border-gray-300">
                    {new Date(result.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
