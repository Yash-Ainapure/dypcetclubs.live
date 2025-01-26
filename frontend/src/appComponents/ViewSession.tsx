import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "./axiosInstance";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.js";
import microBG from "../assets/micro1.avif";

export const ViewSession = () => {
  const location = useLocation();
  const { session } = location.state;
  const navigate = useNavigate();
  const { token } = useAuth();

  const [positions, setPositions] = useState<
    { title: string; description: string; spots: number }[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [newPosition, setNewPosition] = useState({
    title: "",
    description: "",
    spots: 0,
  });
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [displayPositions, setDisplayPositions] = useState<
    {
      PositionID: number;
      SessionID: number;
      Title: string;
      Description: string;
      Spots: number;
    }[]
  >([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<any>(null);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [applicants, setApplicants] = useState<any[]>([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(
          `/api/hiring/getPositions?SessionID=${session.SessionID}`
        );
        setDisplayPositions(response.data);
      } catch (error) {
        console.error("Error fetching positions", error);
      }
    };

    fetchPositions();
  }, [session.SessionID]);

  const handleAddPosition = async () => {
    if (
      newPosition.title.trim() !== "" &&
      newPosition.description.trim() !== "" &&
      newPosition.spots > 0
    ) {
      try {
        setFeedbackMessage("");
        const response = await axios.post(
          `/api/hiring/addHiringPosition?SessionID=${session.SessionID}`,
          newPosition,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPositions([...positions, response.data]);
        setNewPosition({ title: "", description: "", spots: 0 });
        setFeedbackMessage("Position added successfully!");
        setIsSuccess(true);
        setShowModal(false);
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

  const handleUpdatePosition = async () => {
    try {
      setFeedbackMessage("");
      console.log(token);
      const response = await axios.put(
        `/api/hiring/updateHiringPosition?PositionID=${selectedPosition.PositionID}`,
        newPosition,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDisplayPositions(
        displayPositions.map((position) =>
          position.PositionID === selectedPosition.PositionID
            ? response.data
            : position
        )
      );
      setFeedbackMessage("Position updated successfully!");
      setIsSuccess(true);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating position", error);
      setFeedbackMessage("Error updating position. Please try again.");
      setIsSuccess(false);
    }
  };

  const handleDeletePosition = async (positionId: number) => {
    try {
      setFeedbackMessage("");
      console.log(token);
      await axios.delete(
        `/api/hiring/DeleteHiringPosition?PositionID=${positionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setDisplayPositions(
        displayPositions.filter(
          (position) => position.PositionID !== positionId
        )
      );
      setFeedbackMessage("Position deleted successfully!");
      setIsSuccess(true);
    } catch (error) {
      console.error("Error deleting position", error);
      setIsSuccess(false);
    }
  };

  const openEditModal = (position: any) => {
    setSelectedPosition(position);
    setNewPosition({
      title: position.Title,
      description: position.Description,
      spots: position.Spots,
    });
    setIsEdit(true);
    setShowModal(true);
  };

  const handleViewApplicants = async (positionId: number) => {
    try {
      const response = await axios.get(
        `/api/hiring/getApplicantsByPositionId?PositionID=${positionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Applicants", response.data);
      setApplicants(response.data);
      setShowApplicantsModal(true);
    } catch (error) {
      console.error("Error fetching applicants", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${microBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflowY: "auto",
      }}
      className="bg-green-500 w-full min-h-screen rounded-tl-2xl p-4 relative"
    >
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="bg-white p-2 rounded-md absolute top-4 right-4"
      >
        {"<--- Back"}
      </button>
      <h1 className="font-semibold text-xl">Title: {session.Title}</h1>
      <p>Description: {session.Description}</p>
      <p>
        Start Date:
        {new Date(session.StartDate).toLocaleString()}
      </p>
      <p>End Date:{new Date(session.EndDate).toLocaleString()}</p>

      <div className="mt-6">
        <h2 className="text-2xl font-bold">Positions</h2>

        <ul className="mt-4 space-y-2">
          {displayPositions.map((position) => (
            <li
              key={position.PositionID}
              className="flex justify-between items-center border-b border-gray-200 pb-2"
            >
              <div>
                <h3 className="font-semibold">{position.Title}</h3>
                <p className="text-sm">{position.Description}</p>
                <p className="text-sm text-gray-500">
                  Spots available: {position.Spots}
                </p>
              </div>
              <div className="space-x-2 flex">
                <button
                  onClick={() => openEditModal(position)}
                  className="text-blue-600"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDeletePosition(position.PositionID)}
                  className="text-red-600"
                >
                  <FiTrash />
                </button>
                <button
                  onClick={() => handleViewApplicants(position.PositionID)}
                  className=" bg-white p-2 rounded-md"
                >
                  View Applicants
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            setShowModal(true);
            setNewPosition({ title: "", description: "", spots: 0 });
            setIsEdit(false);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Add Position
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 space-y-4 w-96">
            <h2 className="text-xl font-bold">
              {isEdit ? "Edit Position" : "Add New Position"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={newPosition.title}
              onChange={(e) =>
                setNewPosition({ ...newPosition, title: e.target.value })
              }
              className="p-2 border border-gray-300 rounded w-full"
            />
            <textarea
              placeholder="Description"
              value={newPosition.description}
              onChange={(e) =>
                setNewPosition({ ...newPosition, description: e.target.value })
              }
              className="p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="number"
              placeholder="Spots"
              value={newPosition.spots}
              onChange={(e) =>
                setNewPosition({
                  ...newPosition,
                  spots: parseInt(e.target.value),
                })
              }
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
                  setSelectedPosition(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={isEdit ? handleUpdatePosition : handleAddPosition}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {isEdit ? "Update Position" : "Add Position"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showApplicantsModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 space-y-4 w-96">
            <h2 className="text-xl font-bold">Applicants</h2>
            <p>Total applicants: {applicants.length}</p>
            <ul className="mt-2 space-y-2">
              {applicants.map((applicant, index) => (
                <li key={index} className="border-b border-gray-200 pb-2">
                  <p>
                    <strong>Applicant Name:</strong> {applicant.Applicant.Name}
                  </p>
                  <p>
                    <strong>Year of Study:</strong>{" "}
                    {applicant.Applicant.YearOfStudy}
                  </p>
                  <p>
                    <strong>Department:</strong>{" "}
                    {applicant.Applicant.Department}
                  </p>
                  <p>
                    <strong>Phone Number:</strong>{" "}
                    {applicant.Applicant.PhoneNumber}
                  </p>
                  <p>
                    <strong>Resume URL:</strong>{" "}
                    <a
                      href={applicant.Applicant.ResumeURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      resume link
                    </a>
                  </p>
                  {/* <p>
                    <strong>Resume URL:</strong>{" "}
                    <a
                      href="https://drive.google.com/file/d/17wh0jvMWteW1HGCkI8zjitZvF3aA7YdR/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      resume link
                    </a>
                  </p> */}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowApplicantsModal(false)}
              className="bg-red-600 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
