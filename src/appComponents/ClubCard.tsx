import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const ClubCard = ({ name, description, memberCount }) => {
   return (
      <div className="bg-black hover:scale-[101%] transform transition-all duration-500 text-gray-900 rounded-lg shadow-2xl p-6 flex flex-col justify-between">
         <h2 className="mb-2 text-xl font-bold text-white">{name}</h2>
         <p className="mb-4 text-white">{description}</p>
         <div className="flex items-center justify-between">
            <div>
               <FontAwesomeIcon icon={faUser} className="mr-2 text-white" />
               <p className="text-sm font-bold text-white">{memberCount} Members</p>
               <p className="text-sm text-white">Active Club</p>
            </div>
            <button className="px-4 py-2 text-sm font-bold text-black transition-all duration-500 transform bg-white rounded-md hover:scale-105">View Club</button>
         </div>
      </div>
   )
}

export default ClubCard