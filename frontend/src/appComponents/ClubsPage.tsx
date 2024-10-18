"use client";
import { Button } from "@/components/ui/button";
import Clubs from "./Clubs";
import Footer from "./Footer";


const ClubPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      <div className="relative z-10  bg-black  text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 animate-gradient"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center pt-20">
          <h1 className="text-5xl font-extrabold mb-4">Discover DYPCET Clubs</h1>
          <p className="text-xl mb-8">Where Passion Meets Purpose</p>
          <Button
            className="bg-white text-gray-900 hover:bg-gray-200">Keep on Exploring!</Button>
        </div>
      </div>

      <div>
        <Clubs />
        <Footer />
      </div>
      <div />
    </div>
  );
}
export default ClubPage;