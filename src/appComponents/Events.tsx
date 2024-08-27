import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Meteors from "@/components/magicui/meteors";

const Events = () => {

   return (
      <div className='relative flex flex-col items-center justify-center w-full py-8 overflow-hidden text-white md:shadow-xl'>
         <Meteors number={10} />
         <div className="pt-10 pb-16 text-center">
            <h1 className="pb-4 text-3xl font-bold">Upcoming Events</h1>
            <p className="text-lg text-gray-400">Check out the upcoming events and workshops hosted by our vibrant club community.</p>
         </div>
         <div className="grid grid-cols-1 gap-8 px-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">

            {/* Event Box 1 */}
            <div className="hover:scale-[101%] bg-white transform transition-all duration-500  text-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
               <h2 className="mb-2 text-xl font-bold">Robotics Workshop</h2>
               <p className="mb-4 text-gray-600">Learn the fundamentals of robotics and build your own robot.</p>
               <div className="flex items-center justify-between">
                  <div>
                     <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                     <p className="text-sm font-bold text-gray-600">April 15, 2023</p>
                     <p className="text-sm text-gray-600">10:00 AM - 4:00 PM</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-bold text-white transition duration-300 bg-black rounded-md hover:bg-gray-800">Register</button>
               </div>
            </div>

            {/* Event Box 2 */}
            <div className=" hover:scale-[101%] bg-white transform transition-all duration-500 text-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
               <h2 className="mb-2 text-xl font-bold">Entrepreneurship Meetup</h2>
               <p className="mb-4 text-gray-600">Network with local entrepreneurs and learn about starting a business.</p>
               <div className="flex items-center justify-between">
                  <div>
                     <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                     <p className="text-sm font-bold text-gray-600">May 5, 2023</p>
                     <p className="text-sm text-gray-600">6:00 PM - 9:00 PM</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-bold text-white transition duration-300 bg-black rounded-md hover:bg-gray-800">Register</button>
               </div>
            </div>

            {/* Event Box 3 */}
            <div className="hover:scale-[101%] bg-white transform transition-all duration-500 text-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
               <h2 className="mb-2 text-xl font-bold">MLSA Hiring</h2>
               <p className="mb-4 text-gray-600">Network with local entrepreneurs and learn about starting a business.</p>
               <div className="flex items-center justify-between">
                  <div>
                     <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                     <p className="text-sm font-bold text-gray-600">July 29, 2023</p>
                     <p className="text-sm text-gray-600">8:00 PM - 9:00 PM</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-bold text-white transition duration-300 bg-black rounded-md hover:bg-gray-800">Register</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Events