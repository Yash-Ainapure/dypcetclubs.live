import Meteors from "@/components/magicui/meteors";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import axios from "./axiosInstance";

const Events = () => {
  const [events, setEvents] = useState([]);
  const isHomePage = window.location.pathname === "/";

  // function convertDateTime(eventStartDateTime) {
  //   // Convert the string to Date object
  //   let dt = new Date(eventStartDateTime);

  //   // Array of month names
  //   let monthNames = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];

  //   // Get the day, month, year, hours and minutes
  //   let day = dt.getDate();
  //   let month = monthNames[dt.getMonth()];
  //   let year = dt.getFullYear();
  //   let hours = dt.getHours();
  //   let minutes = dt.getMinutes();

  //   // Convert hours from 24-hour format to 12-hour format
  //   let period = hours >= 12 ? "PM" : "AM";
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // the hour '0' should be '12'

  //   // Pad minutes with a zero if needed
  //   minutes = minutes < 10 ? "0" + minutes : minutes;

  //   // Return the formatted date and time
  //   return (
  //     month +
  //     " " +
  //     day +
  //     ", " +
  //     year +
  //     " " +
  //     hours +
  //     ":" +
  //     minutes +
  //     " " +
  //     period
  //   );
  // }

  const formatTimeRange = (startDateTime: any, endDateTime: any) => {
    // Convert the strings to Date objects
    let start = new Date(startDateTime);
    let end = new Date(endDateTime);

    // Array of month names
    let monthNames = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ];

    // Get the day, month, year, hours and minutes
    let day = start.getDate();
    let month = monthNames[start.getMonth()];
    let year = start.getFullYear();
    let startHours = start.getHours();
    let startMinutes: string | number = start.getMinutes();
    let endHours = end.getHours();
    let endMinutes: string | number = end.getMinutes();

    // Convert hours from 24-hour format to 12-hour format
    let startPeriod = startHours >= 12 ? "PM" : "AM";
    startHours = startHours % 12;
    startHours = startHours ? startHours : 12; // the hour '0' should be '12'
    let endPeriod = endHours >= 12 ? "PM" : "AM";
    endHours = endHours % 12;
    endHours = endHours ? endHours : 12; // the hour '0' should be '12'

    // Pad minutes with a zero if needed
    startMinutes = startMinutes < 10 ? "0" + startMinutes : startMinutes;
    endMinutes = endMinutes < 10 ? "0" + endMinutes : endMinutes;

    // Return the formatted date and time range
    return (
      day +
      "/" +
      month +
      "/" +
      year +
      " " +
      startHours +
      ":" +
      startMinutes +
      " " +
      startPeriod +
      " to " +
      endHours +
      ":" +
      endMinutes +
      " " +
      endPeriod
    );
  };

  useEffect(() => {
    const getAllEvents = async () => {
      const response = await axios.get("/api/events/getAllEventData");
      setEvents(response.data);
      // const startDateTime = "2024-09-11T16:00";
      // const endDateTime = "2024-09-11T19:00";
      // const timeRange = formatTimeRange(startDateTime, endDateTime);
      // console.log(timeRange);
    };
    getAllEvents();
  }, []);
  return (
    <div className="relative flex flex-col items-center justify-center w-full py-8 overflow-hidden text-white md:shadow-xl">
      {isHomePage && (
        <div>
          <Meteors number={10} />
          <div className="pt-10 pb-16 text-center">
            <h1 className="pb-4 text-3xl font-bold">Upcoming Events</h1>
            <p className="text-lg text-gray-400">
              Check out the upcoming events and workshops hosted by our vibrant
              club community.
            </p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-8 px-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event: any) => (
          <EventCard
            key={event.EventID}
            name={event.EventName}
            description={event.Description}
            time={formatTimeRange(event.StartDateTime, event.EndDateTime)}
          />
        ))}
      </div>
      {isHomePage && (
        <div className="flex justify-center mt-4">
          <p className="mt-4 text-base text-white">
            Want to know about more Events? Visit our Dedicated&nbsp;
            <a href="/events">
              <b>Events</b>
            </a>
            &nbsp;Page.
          </p>
        </div>
      )}
    </div>
  );
};

export default Events;
