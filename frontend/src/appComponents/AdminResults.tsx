import axios from "./axiosInstance";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Dropdown } from "flowbite-react";

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
  const [Allresults, setAllResults] = useState<Result[]>([]);
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  

  useEffect(() => {
    if (userData) {
      fetchQuizzes();
    }
  }, [userData]);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`/api/quizzes/getClubQuizzes?ClubID=${userData?.ClubID}`);
      if (response.status === 200) {
        setQuizzes(response.data);
      } else {
        console.error("Failed to fetch quizzes");
      }
    } catch (error) {
      console.error("Error fetching quizzes", error);
    }
  };

  


  const fetchResults = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setLoading(true);
    console.log("Fetching results for quiz ID:", id, "with ClubID:", userData?.ClubID);
    
    try {
      const response = await axios.get(`/api/quizzes/${id}/results?ClubID=${userData?.ClubID}`);
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

  const fetchResultsForAllQuizzes = async () => {
    if (!quizzes.length) return;

    setLoading(true);
    try {
      const resultsPromises = quizzes.map((quiz) =>
        axios.get(`/api/quizzes/${quiz.id}/results?ClubID=${userData?.ClubID}`)
      );

      const resultsResponses = await Promise.all(resultsPromises);
      const allResults = resultsResponses.flatMap((response) => response.data);
      setAllResults(allResults);
    } catch (error) {
      console.error("Error fetching all results", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sortOption) {
      fetchResultsForAllQuizzes();
      sortResults(sortOption);
    }
  }, [sortOption]);

  const sortResults = (option: string) => {
    const sortedResults = [...Allresults];
    switch (option) {
      case "Submission Time":
        sortedResults.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "Score":
        sortedResults.sort((a, b) => b.score - a.score);
        break;
      case "Year":
        sortedResults.sort((a, b) => parseInt(a.user.year, 10) - parseInt(b.user.year, 10));
        break;
      case "Rollno":
        sortedResults.sort((a, b) => parseInt(a.user.rollNo, 10) - parseInt(b.user.rollNo, 10));
        break;
      default:
        break;
    }
    setResults(sortedResults);
  };


  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  return (
    <div className="p-4 bg-slate-400 overflow-y-scroll w-full rounded-tl-2xl ">
      <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
      <form className="p-4 flex" onSubmit={fetchResults}>
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
          type="submit"
          className="bg-gray-300 p-2 rounded-md text-black font-semibold"
        >
          {loading ? "Fetching..." : "Fetch Results"}
        </button>
        <div className="mx-8 bg-black">
          <Dropdown label="Sort (A-Z)" dismissOnClick={false}>
            <Dropdown.Item onClick={() => setSortOption("Submission Time")} >By Submission Time</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOption("Score")}>By Score</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOption("Year")}>By Year</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOption("Rollno")}>By Rollno</Dropdown.Item>
          </Dropdown>
        </div>
      </form>

      <div className="mb-4 flex items-center">
        <button className="text-white font-bold text-lg pl-4" >
         
        </button>
        <span className="ml-2 font-bold text-2xl">Quizzes created by you:</span>
      </div>

   
        <table className="w-full border-collapse mb-10">
          <thead>
            <tr>
              <th className="p-2 rounded-tl-2xl bg-gray-300">Quiz ID</th>
              <th className="p-2 bg-gray-300">Quiz Name</th>
              <th className="p-2 bg-gray-300">Creation Time</th>
              <th className="p-2 bg-gray-300 rounded-tr-2xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td className="border border-gray-300 p-2">{quiz.id}</td>
                <td className="border border-gray-300 p-2">{quiz.title}</td>
                <td className="border border-gray-300 p-2">{new Date(quiz.createdAt).toLocaleString()}</td>
                <td
                  className="border border-gray-300 p-2 cursor-pointer text-red-600"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this quiz?")) {
                      axios.delete(`/api/quizzes/${quiz.id}`).then((response) => {
                        if (response.status === 200) {
                          fetchQuizzes();
                        }
                      }).catch((error) => {
                        console.error("Error deleting quiz", error);
                      });
                    }
                  }}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    

      <h3 className="text-white font-semibold text-lg pl-4">Quiz Results:</h3>
      {loading ? (
        <p>Loading results...</p>
      ) : results.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 bg-gray-300 ">User Name</th>
              <th className="p-2 bg-gray-300">Roll No</th>
              <th className="p-2 bg-gray-300">Year</th>
              <th className="p-2 bg-gray-300">Score</th>
              <th className="p-2 bg-gray-300">Submission Time</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td className="border border-gray-300 p-2">{result.user.name}</td>
                <td className="border border-gray-300 p-2">{result.user.rollNo}</td>
                <td className="border border-gray-300 p-2">{result.user.year}</td>
                <td className="border border-gray-300 p-2">{result.score}</td>
                <td className="border border-gray-300 p-2">{new Date(result.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
