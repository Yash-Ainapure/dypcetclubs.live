"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "./axiosInstance";
import { useAuth } from "../context/AuthContext";

const AddClubMembers = () => {
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
      console.log(response);
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
    <div className="min-h-screen w-full text-white rounded-tl-2xl">
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 animate-gradient"></div>
      </div>
      <div className="min-h-screen px-6 py-12 bg-black rounded-tl-2xl">
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-600">
          <h2 className="text-3xl font-bold mb-4 text-center">Add Club Member</h2>
          {error && <div className="text-red-400 mb-4 text-center">{error}</div>}
          {success && <div className="text-green-400 mb-4 text-center">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="date"
                placeholder="Join Date"
                value={joinDate}
                onChange={(e) => setJoinDate(e.target.value)}
                required
                className="p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Profile Image URL"
                value={profileImageURL}
                onChange={(e) => setProfileImageURL(e.target.value)}
                className="p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <Button
              type="submit"
              className="mt-6 bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6 py-3 transition duration-200 shadow-lg"
            >
              Add Member
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClubMembers;
