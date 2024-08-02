import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Meteors from "@/components/magicui/meteors";
import Particles from "@/components/magicui/particles";

const Events = () => {

   return (
      <div className='relative text-white flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl'>
         <Meteors number={50} />
         <Particles
            className="absolute inset-0"
            quantity={400}
            ease={40}
            color={"#ffffff"}
            refresh
         />
         <div className="text-center mt-12">
            <h1 className="text-3xl font-bold mb-2">Upcoming Events</h1>
            <p className="text-gray-400 text-lg">Check out the upcoming events and workshops hosted by our vibrant club community.</p>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">

            {/* Event Box 1 */}
            <div className="bg-white text-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
               <h2 className="text-xl font-bold mb-2">Robotics Workshop</h2>
               <p className="text-gray-600 mb-4">Learn the fundamentals of robotics and build your own robot.</p>
               <div className="flex items-center justify-between">
                  <div>
                     <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                     <p className="text-gray-600 text-sm font-bold">April 15, 2023</p>
                     <p className="text-gray-600 text-sm">10:00 AM - 4:00 PM</p>
                  </div>
                  <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-800 transition duration-300">Register</button>
               </div>
            </div>

            {/* Event Box 2 */}
            <div className="bg-white text-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
               <h2 className="text-xl font-bold mb-2">Entrepreneurship Meetup</h2>
               <p className="text-gray-600 mb-4">Network with local entrepreneurs and learn about starting a business.</p>
               <div className="flex items-center justify-between">
                  <div>
                     <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                     <p className="text-gray-600 text-sm font-bold">May 5, 2023</p>
                     <p className="text-gray-600 text-sm">6:00 PM - 9:00 PM</p>
                  </div>
                  <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-800 transition duration-300">Register</button>
               </div>
            </div>

            {/* Event Box 3 */}
            <div className="bg-white text-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
               <h2 className="text-xl font-bold mb-2">MLSA Hiring</h2>
               <p className="text-gray-600 mb-4">Network with local entrepreneurs and learn about starting a business.</p>
               <div className="flex items-center justify-between">
                  <div>
                     <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                     <p className="text-gray-600 text-sm font-bold">July 29, 2023</p>
                     <p className="text-gray-600 text-sm">8:00 PM - 9:00 PM</p>
                  </div>
                  <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-800 transition duration-300">Register</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Events