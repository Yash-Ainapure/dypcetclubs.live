"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Footer from "./Footer"; // Ensure the Footer component is in the correct path
import { Navigation } from "./Navbar"; // Ensure Navigation is imported correctly
import axios from "./axiosInstance";
import { useAuth } from "../context/AuthContext";


const HiringPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [profileImageURL, setProfileImageURL] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { userData } = useAuth(); // Assuming user contains club information
  const ClubID = userData?.ClubID;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form data here if needed

    try {
      const response = await axios.post("/api/clubs/addMember", {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Role: role,
        JoinDate: joinDate,
        ProfileImageURL: profileImageURL,
        ClubID: ClubID, 
      });
      console.log(response)
      if (response.status === 201) {
        setSuccess("Member added successfully!");
        // Clear form
        setFirstName("");
        setLastName("");
        setEmail("");
        setRole("");
        setJoinDate("");
        setProfileImageURL("");
      }
    } catch (error) {
      setError("An error occurred while adding the member.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      <div className="relative z-10 bg-black text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 animate-gradient"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center pt-20">
          <h1 className="text-5xl font-extrabold mb-4">Join Our Team!</h1>
          <p className="text-xl mb-8">We're Hiring Passionate Individuals.</p>
          <Button className="bg-white text-gray-900 hover:bg-gray-200 rounded-full px-6 py-3 transition duration-200">
            Explore Job Openings
          </Button>
        </div>
      </div>
      <div className="min-h-screen px-6 py-12 bg-white">
        <div className="pb-10 text-center">
          <h1 className="pb-4 text-3xl font-semibold">Current Openings</h1>
          <p className="text-base text-slate-600">
            Check out our latest job postings below:
          </p>
          {/* List the positions for hiring in the card format same as clubs and events */}
        </div>

        {/* Form for adding a club member */}
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-300">
          <h2 className="text-2xl font-semibold mb-4 text-center">Add Club Member</h2>
          {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
          {success && <div className="text-green-600 mb-4 text-center">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                placeholder="Join Date"
                value={joinDate}
                onChange={(e) => setJoinDate(e.target.value)}
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Profile Image URL"
                value={profileImageURL}
                onChange={(e) => setProfileImageURL(e.target.value)}
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button type="submit" className="mt-6 bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6 py-3 transition duration-200">
              Add Member
            </Button>
          </form>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HiringPage;
