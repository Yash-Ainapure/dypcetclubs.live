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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<PositionType | null>(
    null
  );

  const [applicantData, setApplicantData] = useState({
    name: "",
    yearOfStudy: new Date().getFullYear(),
    department: "",
    phoneNumber: "",
    resume: null as File | null,
  });

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

  const handleApply = (position: PositionType) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPosition(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setApplicantData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitApplication = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!selectedPosition) return;

    const formData = new FormData();
    formData.append("name", applicantData.name);
    formData.append("yearOfStudy", applicantData.yearOfStudy.toString());
    formData.append("department", applicantData.department);
    formData.append("phone", applicantData.phoneNumber);
    if (applicantData.resume) {
      formData.append("resume", applicantData.resume);
    }

    try {
      await axios.post(
        `/api/hiring/applyForPosition?PositionID=${selectedPosition.PositionID}`,
        formData
      );
      alert("Application submitted successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl shadow-2xl p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-3xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-400">{name}</h2>
        <button
          onClick={handleToggleSessions}
          className="px-6 py-2 text-sm font-bold bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105"
        >
          {expanded ? "Hide Sessions" : "View Sessions"}
        </button>
      </div>
      <p className="mt-3 text-gray-300 text-sm leading-relaxed">{description}</p>

      {expanded && (
        <div className="mt-6 p-5 bg-gray-700 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-indigo-300">
            Hiring Sessions
          </h3>
          {sessions.length > 0 ? (
            <ul className="space-y-4">
              {sessions.map((session) => (
                <li
                  key={session.SessionID}
                  className="p-5 bg-gray-800 rounded-lg shadow"
                >
                  <div className="mb-2">
                    <p className="font-bold text-indigo-200">{session.Title}</p>
                    <p className="text-sm text-gray-300 mt-2">
                      {session.Description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Date: {new Date(session.StartDate).toLocaleDateString()} -{" "}
                      {new Date(session.EndDate).toLocaleDateString()}
                    </p>
                  </div>

                  {session.Positions.length > 0 ? (
                    <ul className="mt-2 space-y-3 pl-4 border-l-2 border-indigo-400">
                      {session.Positions.map((position) => (
                        <li key={position.PositionID} className="pl-2">
                          <p className="text-white font-semibold">
                            {position.Title}
                          </p>
                          <p className="text-sm text-gray-300">
                            {position.Description}
                          </p>
                          <p className="text-sm text-gray-500">
                            Spots Available: {position.Spots}
                          </p>
                          <button
                            onClick={() => handleApply(position)}
                            className="mt-3 px-4 py-2 text-sm font-bold bg-blue-600 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                          >
                            Apply
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 mt-2">
                      No positions available.
                    </p>
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

      {isModalOpen && selectedPosition && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-95 hover:scale-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Apply for {selectedPosition.Title}
            </h3>
            <form onSubmit={handleSubmitApplication}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={applicantData.name}
                onChange={handleInputChange}
                className="w-full p-3 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="number"
                name="yearOfStudy"
                placeholder="Year of Study"
                value={applicantData.yearOfStudy}
                onChange={handleInputChange}
                className="w-full p-3 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={applicantData.department}
                onChange={handleInputChange}
                className="w-full p-3 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={applicantData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-3 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="file"
                name="resume"
                onChange={(e) =>
                  setApplicantData({
                    ...applicantData,
                    resume: e.target.files?.[0] || null,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-indigo-500"
              />

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105"
              >
                Submit Application
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="mt-4 w-full py-3 bg-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-400 transition-all transform hover:scale-105"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HiringSessionClubCard;