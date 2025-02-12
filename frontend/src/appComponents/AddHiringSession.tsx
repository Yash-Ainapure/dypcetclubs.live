"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "./axiosInstance";
import { useAuth } from "../context/AuthContext";
import microBG from "../assets/micro1.avif";

const AddHiringSession = ({ setAddSessionModal }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { userData } = useAuth();
  const ClubID = userData?.ClubID;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `/api/hiring/createHiringSession/?ClubID=${ClubID}`,
        {
          title: title,
          description: description,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        }
      );
      console.log(response);
      if (response.status === 201) {
        setSuccess("Hiring session created successfully!");
        setTitle("");
        setDescription("");
        setStartDate("");
        setEndDate("");
      }
    } catch (error) {
      setError("An error occurred while creating the hiring session.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        style={{
          backgroundImage: `url(${microBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="p-6 rounded-md shadow-lg relative w-[90%] md:w-[75%]"
      >
        <p
          onClick={() => setAddSessionModal(false)}
          className="text-red-600 cursor-pointer absolute top-4 right-4"
        >
          X
        </p>
        <h2 className="text-3xl font-bold mb-4 text-center pt-4">
          Add Hiring Session
        </h2>
        {error && <div className="text-red-400 mb-4 text-center">{error}</div>}
        {success && (
          <div className="text-green-400 mb-4 text-center">{success}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
            <input
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="mt-4 w-96 text-lg bg-blue-600 font-semibold text-white hover:bg-blue-700 rounded-lg px-6 py-3 transition duration-200 shadow-lg"
            >
              Create Session
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHiringSession;
