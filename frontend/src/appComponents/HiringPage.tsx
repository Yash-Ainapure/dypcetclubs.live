"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Footer from "./Footer";
import HiringSessionClubCard from "./HiringSessionClubCard";
import { useClubs } from "../hooks/useClubs";
import { useHiringSessions } from "../hooks/useHiringSessions";

const HiringPage = () => {
  const { data: clubs } = useClubs();
  const { data: hiringSessions } = useHiringSessions();
  const [activeSession, setActiveSession] = useState<number | null>(null);

  const sessionsByClubId =
    hiringSessions?.reduce((acc, session) => {
      if (!acc[session.ClubID]) {
        acc[session.ClubID] = [];
      }
      acc[session.ClubID].push(session);
      return acc;
    }, {} as Record<number, typeof hiringSessions>) || {};

  const clubsWithSessions = clubs?.filter(
    (club) => sessionsByClubId[club.ClubID]?.length > 0
  ) || [];

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 to-purple-700 text-white py-32 px-6 text-center shadow-lg">
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl font-extrabold mb-6">Join Our Elite Team</h1>
          <p className="text-xl mb-8 opacity-90">Unlock your potential with exciting opportunities.</p>
          <Button className="bg-white text-blue-700 font-semibold px-8 py-3 text-lg shadow-md rounded-lg hover:bg-gray-200 transition-all">
            Explore Careers
          </Button>
        </div>
      </div>
      
      {/* Job Listings Section */}
      <div className="py-20 px-6 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900">Open Positions</h2>
          <p className="text-lg text-gray-600 mt-4">Find your next career move with us.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
          {clubsWithSessions.length > 0 ? (
            clubsWithSessions.map((club) => (
              <HiringSessionClubCard
                key={club.ClubID}
                memberCount={club.Members.length}
                name={club.ClubName}
                description={club.Description}
                email={club.Email}
            
              />
            ))
          ) : (
            <p className="text-gray-500 text-center text-lg col-span-full">
              No active hiring sessions available at the moment.
            </p>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HiringPage;
