import axios from "./axiosInstance";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminResults() {
  const [results, setResults] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (userData) {
      fetchQuizzes();
    } else {
      console.log("userData");
      console.log(userData);
      console.log("not authenticated..");
    }
  }, [userData]);

  const fetchResults = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/quizzes/${id}/results?ClubID=${userData?.ClubID}`,
      );
      if (response.status === 200) {
        setResults(response.data);
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Failed to fetch results");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching results", error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      try {
        const response = await axios.get(
          `/api/quizzes/getClubQuizzes?ClubID=${userData?.ClubID}`,
        );
        if (response.status === 200) {
          setQuizzes(response.data);
        } else {
          console.error("Failed to fetch quizzes");
        }
      } catch (error) {
        console.error("Error fetching quizzes", error);
      }
    } catch (error) {
      console.error("Error fetching quizzes", error);
    }
  };

  const handleIdChange = (event: any) => {
    setId(event.target.value);
  };

  return (
    <div className="p-4 bg-slate-400 w-full rounded-tl-2xl">
      <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
      <form className=" p-4">
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
          onClick={fetchResults}
        >
          {loading ? "fetching..." : "Fetch Results"}
        </button>
      </form>
      <h3 className="text-white font-semibold text-lg pl-4">
        {" "}
        Quizzes created by you:
      </h3>
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
                }else{
                  console.log("Deletion");
                }
              }}>
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-white font-semibold text-lg pl-4"> Quiz Results :</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="">
            <th className="p-2 rounded-tl-2xl bg-gray-300">Sr. No.</th>
            <th className="p-2 bg-gray-300">Name</th>
            <th className="p-2 bg-gray-300">Roll No</th>
            <th className="bg-gray-300 p-2">Year</th>
            <th className="bg-gray-300 p-2">Score</th>
            <th className="bg-gray-300 p-2 rounded-tr-2xl">Submission Time</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result: any, index) => (
            <tr key={result.id}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{result.user.name}</td>
              <td className="border border-gray-300 p-2">
                {result.user.rollNo}
              </td>
              <td className="border border-gray-300 p-2">{result.user.year}</td>
              <td className="border border-gray-300 p-2">
                {result.score.toFixed(2)}%
              </td>
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
