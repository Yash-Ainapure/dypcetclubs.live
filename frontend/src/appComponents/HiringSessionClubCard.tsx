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

  const handleSubmitApplication = async () => {
    if (!selectedPosition) return;

    const applicationData = {
      name: applicantData.name,
      yearOfStudy: parseInt(applicantData.yearOfStudy as unknown as string, 10),
      department: applicantData.department,
      phone: applicantData.phoneNumber,
      resume: "",
    };

    try {
      await axios.post(
        `/api/hiring/applyForPosition?PositionID=${selectedPosition.PositionID}`,
        applicationData
      );
      alert("Application submitted successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application.");
    }
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

      {expanded && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">
            Hiring Sessions
          </h3>

          {sessions.length > 0 ? (
            <ul className="space-y-4">
              {sessions.map((session) => (
                <li
                  key={session.SessionID}
                  className="p-4 bg-gray-900 rounded-lg shadow"
                >
                  <div className="mb-2">
                    <p className="font-bold text-white">{session.Title}</p>
                    <p className="text-sm text-gray-400 mb-1">
                      {session.Description}
                    </p>
                    <p className="text-sm text-gray-400">
                      Date: {new Date(session.StartDate).toLocaleDateString()} -{" "}
                      {new Date(session.EndDate).toLocaleDateString()}
                    </p>
                  </div>

                  {session.Positions.length > 0 ? (
                    <ul className="mt-2 space-y-3 pl-4 border-l border-gray-700">
                      {session.Positions.map((position) => (
                        <li key={position.PositionID} className="pl-2">
                          <p className="text-white font-semibold">
                            {position.Title}
                          </p>
                          <p className="text-sm text-gray-400">
                            {position.Description}
                          </p>
                          <p className="text-sm text-gray-500">
                            Spots Available: {position.Spots}
                          </p>
                          <button
                            onClick={() => handleApply(position)}
                            className="mt-2 px-3 py-1 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">
              Apply for {selectedPosition.Title}
            </h3>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={applicantData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-3"
              />
              <input
                type="number"
                name="yearOfStudy"
                placeholder="Year of Study"
                value={applicantData.yearOfStudy}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-3"
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={applicantData.department}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-3"
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={applicantData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-3"
              />
              <input
                type="file"
                onChange={(e) =>
                  setApplicantData({
                    ...applicantData,
                    resume: e.target.files?.[0] || null,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded mb-3"
              />

              <button
                type="button"
                onClick={handleSubmitApplication}
                className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-all"
              >
                Submit Application
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="mt-2 w-full py-2 bg-gray-300 text-gray-700 font-bold rounded hover:bg-gray-400 transition-all"
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
