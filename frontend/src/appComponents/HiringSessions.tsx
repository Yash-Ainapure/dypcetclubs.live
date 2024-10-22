"use client";
import { useEffect, useState } from "react";
import axios from "./axiosInstance";
import { useAuth } from "../context/AuthContext";

function HiringSessions({ setDisplaySessionModal }: any) {
  const { userData } = useAuth();
  const ClubID = userData?.ClubID;
  const [sessions, setSessions] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`/api/hiring/hiringSessions?ClubID=${ClubID}`);
        setSessions(response.data);
      } catch (error) {
        setError("Failed to fetch hiring sessions. Please try again.");
        console.error(error);
      }
    };

    if (ClubID) {
      fetchSessions();
    }
  }, [ClubID]);

  return (
    <div className="relative p-6 bg-white rounded-md shadow-lg">
      <p
        onClick={() => {
          setDisplaySessionModal(false);
        }}
        className="text-red-600 cursor-pointer absolute top-4 right-4"
      >
        X
      </p>
      <h2 className="text-2xl font-bold mb-4 text-center">Hiring Sessions</h2>
      {error && <div className="text-red-400 mb-4 text-center">{error}</div>}
      {sessions.length === 0 ? (
        <div className="text-center">No hiring sessions available.</div>
      ) : (
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HiringSessions;
