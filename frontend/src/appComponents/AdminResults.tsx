import axios from "./axiosInstance";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Dropdown } from "flowbite-react";
<<<<<<< HEAD
import { FaArrowCircleDown } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
export default function AdminResults() {
  const [sortOption, setSortOption] = useState(""); 
  const [results, setResults] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [showQuizzes, setShowQuizzes] = useState(true); 
=======
import { FaArrowCircleDown, FaArrowCircleRight } from "react-icons/fa";

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
  const [showQuizzes, setShowQuizzes] = useState(true);
>>>>>>> feature

  useEffect(() => {
    if (userData) {
      fetchQuizzes();
    }
  }, [userData]);
  const fetchResultsForAllQuizzes = async () => {
    if (!quizzes.length) return;

<<<<<<< HEAD
    setLoading(true);
    try {
      const resultsPromises = quizzes.map((quiz) =>
        axios.get(`/api/quizzes/${quiz.id}/results?ClubID=${userData?.ClubID}`)
      );

      const resultsResponses = await Promise.all(resultsPromises);
      const allResults = resultsResponses.flatMap((response) => response.data);

      console.log("All Results:", allResults);
      setResults(allResults);
    } catch (error) {
      console.error("Error fetching all results", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchResults = async (e: any) => {
    e.preventDefault();
=======
  const fetchResultsForAllQuizzes = async () => {
    if (!quizzes.length) return;
>>>>>>> feature
    setLoading(true);
    try {
      const resultsPromises = quizzes.map((quiz) =>
        axios.get(`/api/quizzes/${quiz.id}/results?ClubID=${userData?.ClubID}`)
      );
<<<<<<< HEAD
      if (response.status === 200) {
        console.log(response.data)
        setResults(response.data);
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Failed to fetch results");
      }
=======
      const resultsResponses = await Promise.all(resultsPromises);
      const allResults = resultsResponses.flatMap((response) => response.data);
      setResults(allResults);
>>>>>>> feature
    } catch (error) {
      console.error("Error fetching all results", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (quizzes.length > 0) {
      fetchResultsForAllQuizzes();
    }
  }, [quizzes]);

  const fetchResults = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/quizzes/${id}/results?ClubID=${userData?.ClubID}`);
      if (response.status === 200) {
        setResults(response.data);
      } else {
        console.error("Failed to fetch results");
      }
    } catch (error) {
      console.error("Error fetching results", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quizzes.length > 0) {
      fetchResultsForAllQuizzes();
    }
  }, [quizzes]);

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
  useEffect(() => {
    if (sortOption) {
      sortResults(sortOption);
    }
  }, [sortOption, results]);

<<<<<<< HEAD
  const sortResults = (option) => {
    const sortedResults = [...results];
    switch (option) {
      case "Submission Time":
        sortedResults.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
=======
  useEffect(() => {
    if (sortOption) {
      sortResults(sortOption);
    }
  }, [sortOption, results]);

  const sortResults = (option: string) => {
    const sortedResults = [...results];
    switch (option) {
      case "Submission Time":
        sortedResults.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
>>>>>>> feature
        break;
      case "Score":
        sortedResults.sort((a, b) => b.score - a.score);
        break;
      case "Year":
<<<<<<< HEAD
        sortedResults.sort((a, b) => a.user.year - b.user.year);
=======
        sortedResults.sort((a, b) => a.user.year.localeCompare(b.user.year));
>>>>>>> feature
        break;
      case "Rollno":
        sortedResults.sort((a, b) => parseInt(a.user.rollNo, 10) - parseInt(b.user.rollNo, 10));
        break;
      default:
        break;
    }
    setResults(sortedResults);
  };
<<<<<<< HEAD
  const handleIdChange = (event: any) => {
=======

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
>>>>>>> feature
    setId(event.target.value);
  };

  return (
    <div className="p-4 bg-slate-400 overflow-y-scroll w-full rounded-tl-2xl border-4 border-black">
      <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
<<<<<<< HEAD
      <form className=" p-4 flex">
=======
      <form className="p-4 flex" onSubmit={fetchResults}>
>>>>>>> feature
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
<<<<<<< HEAD
        
        <div className="mx-8 bg-black ">
        <Dropdown label="Sort (A-Z)" dismissOnClick={false}>
          <Dropdown.Item onClick={() => setSortOption("Submission Time")} className="hover:bg-slate-200 ">
            By Submission Time
          </Dropdown.Item>
          
          <Dropdown.Item className="hover:bg-slate-200 " onClick={() => setSortOption("Score")}>By Score</Dropdown.Item>
          <Dropdown.Item className="hover:bg-slate-200 " onClick={() => setSortOption("Year")}>By Year</Dropdown.Item>
          <Dropdown.Item className="hover:bg-slate-200 " onClick={() => setSortOption("Rollno")}>By Rollno</Dropdown.Item>
        </Dropdown>
        </div>
      </form>
      
      <div className="mb-4 flex items-center">
        <button
          className=" text-white font-bold text-lg pl-4"
          onClick={() => setShowQuizzes(!showQuizzes)}
        >
=======
        <div className="mx-8 bg-black">
          <Dropdown label="Sort (A-Z)" dismissOnClick={false}>
            <Dropdown.Item onClick={() => setSortOption("Submission Time")}>By Submission Time</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOption("Score")}>By Score</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOption("Year")}>By Year</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOption("Rollno")}>By Rollno</Dropdown.Item>
          </Dropdown>
        </div>
      </form>

      <div className="mb-4 flex items-center">
        <button className="text-white font-bold text-lg pl-4" onClick={() => setShowQuizzes(!showQuizzes)}>
>>>>>>> feature
          {showQuizzes ? <FaArrowCircleDown /> : <FaArrowCircleRight />}
        </button>
        <span className="ml-2 font-bold text-2xl">Quizzes created by you:</span>
      </div>
<<<<<<< HEAD
      {showQuizzes && (
      <table className="w-full border-collapse mb-10">
        <thead>
          <tr className="">
            <th className="p-2 rounded-tl-2xl bg-gray-300">Quiz ID</th>
            <th className="p-2 bg-gray-300">Quiz Name</th>
            <th className="p-2 bg-gray-300">Creation Time</th>
            <th className="p-2 bg-gray-300 rounded-tr-2xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz: any) => (
            <tr key={quiz.id}>
              <td className="border border-gray-300 p-2">{quiz.id}</td>
              <td className="border border-gray-300 p-2">{quiz.title}</td>
              <td className="border border-gray-300 p-2">
                {new Date(quiz.createdAt).toLocaleString()}
              </td>
              <td className="border border-gray-300 p-2 cursor-pointer text-red-600" onClick={() => {
                if (confirm("Are you sure you want to delete this quiz?")) {
                  console.log("id: ", quiz.id);
                  axios.delete(`/api/quizzes/${quiz.id}`).then((response) => {
                    if (response.status === 200) {
                      fetchQuizzes();
                    }
                  }).catch((error) => {
                    console.error("Error deleting quiz", error);
                  });
                } else {
                  console.log("Deletion");
                }
              }}>
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       )}
      <h3 className="text-white font-semibold text-lg pl-4"> Quiz Results :</h3>
=======

      {showQuizzes && (
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
                        if (response.status === 200) fetchQuizzes();
                      }).catch((error) => console.error("Error deleting quiz", error));
                    }
                  }}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 className="text-white font-semibold text-lg pl-4">Quiz Results :</h3>
>>>>>>> feature
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 rounded-tl-2xl bg-gray-300">Sr. No.</th>
            <th className="p-2 bg-gray-300">Name</th>
            <th className="p-2 bg-gray-300">Roll No</th>
            <th className="bg-gray-300 p-2">Year</th>
            <th className="bg-gray-300 p-2">Score</th>
            <th className="bg-gray-300 p-2 rounded-tr-2xl">Submission Time</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={result.id}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{result.user.name}</td>
              <td className="border border-gray-300 p-2">{result.user.rollNo}</td>
              <td className="border border-gray-300 p-2">{result.user.year}</td>
              <td className="border border-gray-300 p-2">{result.score}</td>
              <td className="border border-gray-300 p-2">
                {new Date(result.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
