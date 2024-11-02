import { useState } from "react";
import axios from "../appComponents/axiosInstance";

type HiringSessionClubCardType = {
  name: string;
  description: string;
  memberCount: number;
  email: string;
};

type PositionType = {
  PositionID: number;
  Title: string;
  Description: string;
  Spots: number;
};

type SessionType = {
  SessionID: number;
  Title: string;
  Description: string;
  StartDate: string;
  EndDate: string;
  Positions: PositionType[];
};

const HiringSessionClubCard: React.FC<HiringSessionClubCardType> = ({
  name,
  description,
  email,
}) => {
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [expanded, setExpanded] = useState(false);

  const handleToggleSessions = async () => {
    if (!expanded) {
      try {
        const response = await axios.post(`/api/clubs/findByEmail`, { email });
        const clubId = response.data.ClubID;

        const sessionsResponse = await axios.get(
          `/api/hiring/hiringSessions?ClubID=${clubId}`
        );
        setSessions(sessionsResponse.data);
      } catch (error) {
        console.error("Error fetching club sessions:", error);
      }
    }
    setExpanded(!expanded);
  };

  return (
    <div className="bg-black hover:scale-[101%] transform transition-all duration-500 text-gray-900 rounded-lg shadow-lg p-6 mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">{name}</h2>
        <button
          onClick={handleToggleSessions}
          className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-all"
        >
          {expanded ? "Hide Sessions" : "View Sessions"}
        </button>
      </div>
      <p className="text-white mt-2">{description}</p>

      {/* Collapsible sessions list */}
      {expanded && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">Hiring Sessions</h3>

          {sessions.length > 0 ? (
            <ul className="space-y-4">
              {sessions.map((session) => (
                <li key={session.SessionID} className="p-4 bg-gray-900 rounded-lg shadow">
                  <div className="mb-2">
                    <p className="font-bold text-white">{session.Title}</p>
                    <p className="text-sm text-gray-400 mb-1">{session.Description}</p>
                    <p className="text-sm text-gray-400">
                      Date: {new Date(session.StartDate).toLocaleDateString()} -{" "}
                      {new Date(session.EndDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Positions within each session */}
                  {session.Positions.length > 0 ? (
                    <ul className="mt-2 space-y-3 pl-4 border-l border-gray-700">
                      {session.Positions.map((position) => (
                        <li key={position.PositionID} className="pl-2">
                          <p className="text-white font-semibold">{position.Title}</p>
                          <p className="text-sm text-gray-400">{position.Description}</p>
                          <p className="text-sm text-gray-500">
                            Spots Available: {position.Spots}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 mt-2">No positions available.</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 mt-4">
              No hiring sessions are currently available for this club.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HiringSessionClubCard;
