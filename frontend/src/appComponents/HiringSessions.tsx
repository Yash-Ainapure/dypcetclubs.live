"use client";
import { useEffect, useState } from "react";
import axios from "./axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function HiringSessions({ setDisplaySessionModal }: any) {
  const { userData } = useAuth();
  const ClubID = userData?.ClubID;
  const [sessions, setSessions] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/api/hiring/hiringSessions?ClubID=${ClubID}`);
        setSessions(response.data);
      } catch (error) {
        setError("Failed to fetch hiring sessions. Please try again.");
        console.error(error);
      } finally {
        setLoading(false)
      }
    };

    if (ClubID) {
      fetchSessions();
    }
  }, [ClubID]);

  return (
    <div className="p-6 bg-slate-800 rounded-md shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[75%]">
      <div className="relative">
        <p
          onClick={() => {
            setDisplaySessionModal(false);
          }}
          className="text-red-600 cursor-pointer absolute top-0 right-0"
        >
          X
        </p>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-center text-white">Hiring Sessions</h2>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : sessions.length === 0 ? (
        <div className="text-center text-gray-500">No hiring sessions available.</div>
      ) : (
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li key={session.SessionID} className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-2xl font-semibold text-blue-600">{session.Title}</h3>
              <p className="text-gray-700">{session.Description}</p>
              <p className="text-gray-600">
                <strong>Start Date:</strong> {new Date(session.StartDate).toLocaleString()}
              </p>
              <p className="text-gray-600">
                <strong>End Date:</strong> {new Date(session.EndDate).toLocaleString()}
              </p>
              <div onClick={(e) => {
                e.preventDefault();
                navigate(`/clubAdmin/hiring/${session.SessionID}`, { state: { session } });
              }} className="flex justify-end">
                <button className="bg-blue-600 text-white rounded-md p-2 font-semibold hover:bg-blue-700 transition duration-200 shadow-lg">
                  View
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* <h2 className="text-2xl font-bold mb-4 text-center">Hiring Sessions</h2>
      {error && <div className="text-red-400 mb-4 text-center">{error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : sessions.length === 0 ? (<div>No hiring sessions available.</div>) : (
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li key={session.SessionID} className="p-4 border rounded shadow-sm">
              <h3 className="text-xl font-semibold">{session.Title}</h3>
              <p>{session.Description}</p>
              <p>
                <strong>Start Date:</strong> {new Date(session.StartDate).toLocaleString()}
              </p>
              <p>
                <strong>End Date:</strong> {new Date(session.EndDate).toLocaleString()}
              </p>
              <div onClick={(e) => {
                e.preventDefault();
                navigate(`/clubAdmin/hiring/${session.SessionID}`, { state: { session } })
              }} className="flex justify-end">
                <button className="bg-white rounded-md p-2 font-semibold">View</button>
              </div>
            </li> */}
      {/* ))}
        </ul>
      )} */}
    </div>
  );
}

export default HiringSessions;
