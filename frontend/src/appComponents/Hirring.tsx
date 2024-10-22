import React from "react";

const HiringPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-center p-6 bg-white rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Hiring Opportunities</h1>
        <p className="text-xl">Currently, there are no hiring opportunities available.</p>
        <p className="mt-4 text-gray-600">Please check back later for updates!</p>
      </div>
    </div>
  );
};

export default HiringPage;
