import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";


type EventCardProps = {
  name: string;
  description: string;
  time: string;
};

const EventCard: React.FC<EventCardProps> = ({ name, description, time }) => {
  return (
    <div className="hover:scale-[101%] bg-white transform transition-all duration-500  text-gray-900 rounded-lg shadow-md flex flex-col justify-between px-4 py-6">
      <h2 className="mb-2 text-xl font-bold">{name}</h2>
      <p className="mb-4 text-gray-600">{description}</p>
      <div className="flex items-center justify-between">
        <div>
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
          <p className="text-sm font-bold text-gray-600">{time}</p>
        </div>
        <button onClick={()=>{
          window.location.href = "https://forms.gle/u9s7BXa2onvAoVkr9";
        }} className="px-4 py-2 text-sm font-bold text-white transition duration-300 bg-black rounded-md hover:bg-gray-800">
          Register
        </button>
      </div>
    </div>
  );
};

export default EventCard;
