import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";
import microBG from "../assets/micro1.avif";

const ViewEvent = () => {
  const { id } = useParams<{ id: string }>();
  const [eventData, setEventData] = useState<any>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/events/getSingleEventData?EventID=${id}`
        );
        console.log("Event data:", response.data);
        setEventData(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    if (id) {
      fetchEventData();
    }
  }, [id]);
  if (eventData === null) return <div>Loading...</div>;
  return (
    <div
      style={{
        backgroundImage: `url(${microBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="rounded-tl-2xl p-4 w-full min-h-screen"
    >
      <button
        onClick={() => {
          navigate("/clubAdmin/events");
        }}
        className="absolute top-6 right-8 p-2 bg-white text-black font-semibold rounded-md block"
      >
        {"<-- Back"}
      </button>
      <div className="p-4">
        <p className="text-xl font-semibold pb-4">Event Information:</p>
        <p>Event ID:{eventData.EventID}</p>
        <p> name: {eventData.EventName}</p>
        <p>Description: {eventData.Description}</p>
        <p>Location: {eventData.Location}</p>
      </div>
    </div>
  );
};

export default ViewEvent;
