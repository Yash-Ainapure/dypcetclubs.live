"use client";
import { Navigation } from "./Navbar";
import { Button } from "@/components/ui/button";
import Footer from "./Footer";
import Events from "./Events";
import Meteors from "@/components/magicui/meteors";


const EventsPage = () => {      
        return (
          <div className="min-h-screen w-full bg-gray-50 text-gray-800">

          <div className="relative z-10  bg-black  text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
              <div className="absolute inset-0 animate-gradient"></div>
              <div className="relative z-10 max-w-4xl mx-auto text-center pt-20">
                  <h1 className="text-5xl font-extrabold mb-4">Gateway To Exciting Events</h1>
                  <p className="text-xl mb-8">Buckle Up to Explore.</p>
                  <Button 
                  className="bg-white text-gray-900 hover:bg-gray-200">Keep on Blasting!</Button>
              </div>
          </div>

          <Navigation/>
          <div className="relative flex flex-col items-center justify-center w-full py-8 overflow-hidden text-black md:shadow-xl">
          <Meteors number={10} />
          <div className="pt-10 pb-16 text-center">
            <h1 className="pb-4 text-3xl font-bold">Upcoming Events</h1>
            <p className="text-lg text-gray-400">
              Check out the upcoming events and workshops hosted by our vibrant
              club community.
            </p>
          </div>
            <Events/>
            <Footer/>
            </div>
            <div/>
            </div>
        );
      }
export default EventsPage;