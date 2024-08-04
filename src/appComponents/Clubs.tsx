import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import Particles from "@/components/magicui/particles";



export default function Clubs() {
  const numberOfParticles = window.innerWidth >= 768 ? 400 : 100;

  return (
    <div className="py-12 px-6 text-slate-300">
      <Particles
        className="absolute inset-0"
        quantity={numberOfParticles}
        ease={40}
        color="#ffffff"
        refresh
      />
      {/* Heading 1 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold mb-2">Our Clubs</h1>
        <p className="text-slate-400 text-lg">Explore the diverse range of clubs at our college and discover your passions.</p>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Club Box 1 */}
        <div className="bg-slate-200 text-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
          <h2 className="text-xl font-bold mb-2">Robotics Club</h2>
          <p className="text-gray-600 mb-4">Explore the world of robotics and automation with us.</p>
          <div className="flex items-center justify-between">
            <div>
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <p className="text-gray-600 text-sm font-bold">20 Members</p>
              <p className="text-gray-600 text-sm">Active Club</p>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-800 transition duration-300">View Club</button>
          </div>
        </div>

        {/* Club Box 2 */}
        <div className="bg-slate-200  text-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
          <h2 className="text-xl font-bold mb-2">Entrepreneurship Club</h2>
          <p className="text-gray-600 mb-4">Nurture your entrepreneurial spirit and learn from industry experts.</p>
          <div className="flex items-center justify-between">
            <div>
              <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
              <p className="text-gray-600 text-sm font-bold">35 Members</p>
              <p className="text-gray-600 text-sm">Active Club</p>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-800 transition duration-300">View Club</button>
          </div>
        </div>

        {/* Club Box 3 */}
        <div className="bg-slate-200  text-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
          <h2 className="text-xl font-bold mb-2">Design Club</h2>
          <p className="text-gray-600 mb-4">Unleash your creativity and explore the world of design.</p>
          <div className="flex items-center justify-between">
            <div>
              <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
              <p className="text-gray-600 text-sm font-bold">18 Members</p>
              <p className="text-gray-600 text-sm">Active Club</p>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-800 transition duration-300">View Club</button>
          </div>
        </div>

        {/* Club Box 4 */}
        <div className="bg-slate-200  text-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
          <h2 className="text-xl font-bold mb-2">Photography Club</h2>
          <p className="text-gray-600 mb-4">Capture the world through your lens and hone your photography skills.</p>
          <div className="flex items-center justify-between">
            <div>
              <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
              <p className="text-gray-600 text-sm font-bold">22 Members</p>
              <p className="text-gray-600 text-sm">Active Club</p>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-800 transition duration-300">View Club</button>
          </div>
        </div>

        {/* Club Box 5 */}
        <div className="bg-slate-200  text-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
          <h2 className="text-xl font-bold mb-2">Music Club</h2>
          <p className="text-gray-600 mb-4">Explore the world of music and showcase your talents.</p>
          <div className="flex items-center justify-between">
            <div>
              <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
              <p className="text-gray-600 text-sm font-bold">15 Members</p>
              <p className="text-gray-600 text-sm">Active Club</p>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-800 transition duration-300">View Club</button>
          </div>
        </div>

        {/* Club Box 6 */}
        <div className="bg-slate-200  text-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
          <h2 className="text-xl font-bold mb-2">Coding Club</h2>
          <p className="text-gray-600 mb-4">Develop your programming skills and build innovative projects.</p>
          <div className="flex items-center justify-between">
            <div>
              <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
              <p className="text-gray-600 text-sm font-bold">28 Members</p>
              <p className="text-gray-600 text-sm">Active Club</p>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-800 transition duration-300">View Club</button>
          </div>
        </div>
      </div>
    </div>
  );
}
