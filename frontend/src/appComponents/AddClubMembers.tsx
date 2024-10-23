"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "./axiosInstance";
import { useAuth } from "../context/AuthContext";

const AddClubMembers = ({ setAddMemberModal }:any) => {
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
    <div className="p-6 bg-white rounded-md shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[75%]">
      <p onClick={()=>{
        setAddMemberModal(false)
      }} className="text-red-600 cursor-pointer absolute top-4 right-4">X</p>
      <h2 className="text-3xl font-bold mb-4 text-center pt-4">Add Club Member</h2>
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
          className="mt-4 bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-6 py-3 transition duration-200 shadow-lg"
        >
          Add Member
        </Button>
      </form>
    </div>
  );
};

export default AddClubMembers;
