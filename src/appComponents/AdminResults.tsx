import axios from "axios";
import { useState } from "react";

export default function AdminResults() {
  const [results, setResults] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchResults = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/quizzes/${id}/results`,
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

  const handleIdChange = (event) => {
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
          />
        </label>
        <button
          disabled={loading}
          type="submit"
          className="bg-black p-2 rounded-md text-white font-semibold"
          onClick={fetchResults}
        >
          {loading ? "fetching..." : "Fetch Results"}
        </button>
      </form>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Roll No</th>
            <th className="border border-gray-300 p-2">Year</th>
            <th className="border border-gray-300 p-2">Score</th>
            <th className="border border-gray-300 p-2">Submission Time</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
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
