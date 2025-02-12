import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "../appComponents/axiosInstance"; // Import your axios instance

type ClubCardType = {
  name: string;
  description: string;
  memberCount: number;
  email: string; // Add email prop
};

const ClubCard: React.FC<ClubCardType> = ({
  name,
  description,
  memberCount,
  email, // Receive email as a prop
}) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleViewClub = async () => {
    try {
      // Make an API call to find the club ID using the email
      const response = await axios.post(`/api/clubs/findByEmail`, { email }); // Use POST and send email in body
      const clubId = response.data.ClubID; // Assuming response contains ClubID

      // Navigate to the club's detail page with the found ClubID
      navigate(`/clubs/${clubId}`);
    } catch (error) {
      console.error("Error fetching club ID:", error);
      // Optionally handle the error (e.g., show a message)
    }
  };

  return (
    <div className="bg-black hover:scale-[101%] transform transition-all duration-500 text-gray-900 rounded-lg shadow-2xl p-4 md:p-6 flex flex-col justify-between ">
      <h2 className="mb-2 text-xl font-bold text-white">{name}</h2>
      <p className="mb-4 text-white">{description}</p>
      <div className="flex items-end md:items-center justify-between">
        <div>
          <FontAwesomeIcon icon={faUser} className="mr-2 text-white" />
          <p className="text-sm font-bold text-white">{memberCount} Members</p>
          <p className="text-sm text-white">Active Club</p>
        </div>
        <button
          onClick={handleViewClub} // Handle the click event
          className="md:py-2 md:px-2 py-1 px-1 text-sm font-bold text-black transition-all duration-500 transform bg-white rounded-md hover:scale-105"
        >
          View Club
        </button>
      </div>
    </div>
  );
};

export default ClubCard;
