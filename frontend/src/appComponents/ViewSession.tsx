import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "./axiosInstance";

export const ViewSession = () => {
  const location = useLocation();
  const { session } = location.state;
  const navigate = useNavigate();

  const [positions, setPositions] = useState<{ title: string; description: string; spots: number }[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newPosition, setNewPosition] = useState({ title: "", description: "", spots: 0 });
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [displayPositions, setDisplayPositions] = useState<{ PositionID: number; SessionID: number; Title: string; Description: string; Spots: number }[]>([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(`/api/hiring/getPositions?SessionID=${session.SessionID}`);
        setDisplayPositions(response.data);
      } catch (error) {
        console.error("Error fetching positions", error);
      }
    };

    fetchPositions();
  }, [session.SessionID]);

  const handleAddPosition = async () => {
    if (newPosition.title.trim() !== "" && newPosition.description.trim() !== "" && newPosition.spots > 0) {
      try {
        const response = await axios.post(`/api/hiring/addHiringPosition?SessionID=${session.SessionID}`, newPosition);
        setPositions([...positions, response.data]);
        setNewPosition({ title: "", description: "", spots: 0 });
        setFeedbackMessage("Position added successfully!");
        setIsSuccess(true);
      } catch (error) {
        console.error("Error adding position", error);
        setFeedbackMessage("Error adding position. Please try again.");
        setIsSuccess(false);
      }
    } else {
      setFeedbackMessage("Please fill out all fields correctly.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="bg-green-500 w-full min-h-screen rounded-tl-2xl p-4 relative"
    style={{overflowY:"auto"}}
    >
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="bg-white p-2 rounded-md absolute top-4 right-4"
      >
        {"<--- Back"}
      </button>
      <h1>Title: {session.Title}</h1>
      <p>Description: {session.Description}</p>
      <p>
        <strong>Start Date:</strong> {new Date(session.StartDate).toLocaleString()}
      </p>
      <p>
        <strong>End Date:</strong> {new Date(session.EndDate).toLocaleString()}
      </p>

      <div className="mt-6">
        <h2 className="text-2xl font-bold">Positions</h2>

        <ul className="mt-4 space-y-2">
        {displayPositions.map((position) => (
            <li key={position.PositionID} className="flex justify-between items-center border-b border-gray-200 pb-2">
              <div>
                <h3 className="font-semibold">{position.Title}</h3>
                <p className="text-sm">{position.Description}</p>
                <p className="text-sm text-gray-500">Spots available: {position.Spots}</p>
              </div>
              <div className="space-x-2">
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Add Position
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 space-y-4 w-96">
            <h2 className="text-xl font-bold">Add New Position</h2>
            <input
              type="text"
              placeholder="Title"
              value={newPosition.title}
              onChange={(e) => setNewPosition({ ...newPosition, title: e.target.value })}
              className="p-2 border border-gray-300 rounded w-full"
            />
            <textarea
              placeholder="Description"
              value={newPosition.description}
              onChange={(e) => setNewPosition({ ...newPosition, description: e.target.value })}
              className="p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="number"
              placeholder="Spots"
              value={newPosition.spots}
              onChange={(e) => setNewPosition({ ...newPosition, spots: parseInt(e.target.value) })}
              className="p-2 border border-gray-300 rounded w-full"
            />

            {feedbackMessage && (
              <div
                className={`p-2 rounded text-white ${
                  isSuccess ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {feedbackMessage}
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setFeedbackMessage(null); 
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPosition}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Position
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
