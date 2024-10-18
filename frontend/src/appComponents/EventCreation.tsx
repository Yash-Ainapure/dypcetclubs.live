import React, { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import type { FieldApi } from "@tanstack/react-form";
import { useAuth } from "../context/AuthContext";
import axios from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { useRef } from "react";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { CgMoreO } from "react-icons/cg";
// interface Event {
//   ClubID: string;
//   EventName: string;
//   Description: string;
//   StartDateTime: string;
//   EndDateTime: string;
//   Location: string;
// }

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

const EventCreation: React.FC = () => {
  const { userData } = useAuth();
  const [clubInfo, setClubInfo] = useState<any>();
  const [eventData, setEventData] = useState<any>([]);
  const [loading, setLoading] = useState({ state: false, id: null });
  const [updateOrSubmitState, setUpdateOrSubmitState] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null); // Create a reference to the form

  const navigate =useNavigate();

  const form = useForm({
    defaultValues: {
      EventName: "",
      Description: "",
      StartDateTime: "",
      EndDateTime: "",
      Location: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      if (!clubInfo.ClubID) {
        console.log("No club info");
        return;
      }

      if (!updateOrSubmitState) {
        try {
          const response = await axios.post(
            `/api/events/create-event?ClubID=${clubInfo?.ClubID}`,
            {
              EventName: value.EventName,
              Description: value.Description,
              StartDateTime: value.StartDateTime,
              EndDateTime: value.EndDateTime,
              Location: value.Location,
            },
          );
          if (response.status == 201) {
            setEventData([...eventData, response.data]);
            form.reset();
          }
        } catch (e: any) {
          alert("Error: " + e.message);
          console.log(e);
          return;
        }
      } else {
        try {
          const response = await axios.put(
            `/api/events/update-event?ClubID=${clubInfo?.ClubID}`,
            {
              EventID: eventId,
              EventName: value.EventName,
              Description: value.Description,
              StartDateTime: value.StartDateTime,
              EndDateTime: value.EndDateTime,
              Location: value.Location,
            },
          );
          if (response.status == 200) {
            // setEventData([...eventData, response.data]);
            form.reset();
            setShowForm(false);

            // Find the event in the eventData array and replace it with the updated event
            const updatedEventData = eventData.map((event: any) => {
              if (event.EventID === eventId) {
                return response.data;
              }
              return event;
            });
            setEventData(updatedEventData);
          }
          setUpdateOrSubmitState(false);
        } catch (e: any) {
          setUpdateOrSubmitState(false);
          alert("Error: " + e.message);
          console.log(e);
          return;
        }
      }
    },
  });

  useEffect(() => {
    const getEventsData = async () => {
      console.log("fetching event data..")
      axios
        .get(
          `/api/events/getClubEventData?ClubID=${userData?.ClubID}`,
        )
        .then((response) => {
          console.log(response.data);
          setEventData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (userData) {
      setClubInfo(userData?.Club);
      getEventsData();
    } else {
      console.log("userData not set");
      console.log(userData);
    }
  }, [userData]);

  const deleteEvent = async (eventid:any) => {
    setLoading({ state: true, id: eventid });
    try {
      const response = await axios.delete(
        `/api/events/deleteEvent?ClubID=${clubInfo?.ClubID}`,
        {
          data: {
            eventId: eventid,
          },
        },
      );
      if (response.status == 204) {
        alert("Event Deleted Successfully");
        setEventData(
          eventData.filter((event: any) => event.EventID !== eventid),
        );
      }
      setLoading({ state: false, id: null });
    } catch (e:any) {
      setLoading({ state: false, id: null });
      alert("Error: " + e.message);
      console.log(e);
      return;
    }
  };
  const handleCreateEventClick = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      formRef.current?.classList.add("highlight");
      setTimeout(() => formRef.current?.classList.remove("highlight"), 2000); // Remove highlight after 2 seconds
    }, 100);
  };

  return (
    <>
    <div className="rounded-tl-2xl w-full bg-black min-h-screen ">
    <div className=" items-center justify-center min-h-screen  ">
    <div className="flex justify-center mt-10">
    <button className="p-2 font-semibold text-black bg-white rounded-md w-36"
        onClick={handleCreateEventClick} >
              {" "}
              Create new Event{" "}
    </button>
    </div>
    <div className="fixed w-full h-86 mt-10 overflow-auto justify-center flex">

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form
        className="flex justify-center flex-col  items-center gap-4 p-4 border border-black rounded-xl w-fit bg-[#6284eb]"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        ref={formRef} 
      >
        <div className="">
          {/* A type-safe field component*/}
          <form.Field
            name="EventName"
            validators={{
              onChange: ({ value }) =>
                !value ? "EventName is required" : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") && 'No "error" allowed in EventName'
                );
              },
            }}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <div className=" p-2 mb-4 " >
                    <span className="flex justify-end cursor-pointer" onClick={(()=>{setShowForm(false)})}><ImCross/></span>
                    <span className="text-center justify-center flex text-2xl font-extrabold">New Event</span>
                    </div>
                  <label htmlFor={field.name}>EventName:</label>
                
                  <input
                    className="mx-2 border rounded-md"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <div className="text-red-600">
                    <FieldInfo field={field} />
                  </div>
                </>
              );
            }}
          />
        </div>
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="Description"
            validators={{
              onChange: ({ value }) =>
                !value ? "Description is required" : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") &&
                  'No "error" allowed in Description'
                );
              },
            }}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label htmlFor={field.name}>Description:</label>
                  <input
                    className="mx-2 border rounded-md"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <div className="text-red-600">
                    <FieldInfo field={field} />
                  </div>
                </>
              );
            }}
          />
        </div>
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="StartDateTime"
            validators={{
              onChange: ({ value }) =>
                !value ? "StartDateTime is required" : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") &&
                  'No "error" allowed in StartDateTime'
                );
              },
            }}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label htmlFor={field.name}>StartDate:</label>
                  <input
                    className="mx-2 border rounded-md"
                    type="datetime-local"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <div className="text-red-600">
                    <FieldInfo field={field} />
                  </div>
                </>
              );
            }}
          />
        </div>
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="EndDateTime"
            validators={{
              onChange: ({ value }) =>
                !value ? "EndDateTime is required" : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") &&
                  'No "error" allowed in EndDateTime'
                );
              },
            }}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label htmlFor={field.name}>EndDate:</label>
                  <input
                    className="mx-2 border rounded-md"
                    type="datetime-local"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <div className="text-red-600">
                    <FieldInfo field={field} />
                  </div>
                </>
              );
            }}
          />
        </div>
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="Location"
            validators={{
              onChange: ({ value }) =>
                !value ? "Location is required" : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") && 'No "error" allowed in Location'
                );
              },
            }}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label htmlFor={field.name}>Location:</label>
                  <input
                    className="mx-2 border rounded-md"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <div className="text-red-600">
                    <FieldInfo field={field} />
                  </div>
                </>
              );
            }}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              className="px-4 py-2 font-semibold text-white bg-black rounded-md"
              type="submit"
              
              
              disabled={!canSubmit}
             
            >
              {updateOrSubmitState
                ? isSubmitting
                  ? "Updating..."
                  : "Update"
                : isSubmitting
                  ? "Submiting..."
                  : "Submit"}
            </button>
          )}
        />
      </form>
      </div>
      )}

        

    </div>
     <div className="flex flex-col items-center gap-4 mt-2 justify-center  mx-10">
          <p className="self-start  text-lg font-semibold text-white ">
            Events Created by you:{" "}
          </p>
          <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-200 dark:text-gray-100">
            <thead className="text-xm text-black uppercase bg-gray-50 dark:bg-gray-400 dark:text-gray-100">
              <tr>
                <th className="px-6 py-3">
                  Event Name
                </th>
                <th className="px-6 py-3 ">Description</th>
                <th className="px-6 py-3">StartDate Time</th>
                <th className="px-6 py-3">EndDate Time</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody>
              {eventData?.map((event: any) => (
                <tr
                  className="border-b-2 bg-[#41589d] text-white"
                  key={event.id}
                >
                  <td className="px-2 py-2 border-r">{event.EventName}</td>
                  <td className="px-2 border-r">{event.Description}</td>
                  <td className="px-2 border-r">{event.StartDateTime}</td>
                  <td className="px-2 border-r">{event.EndDateTime}</td>
                  <td className="px-2 border-r">{event.Location}</td>
                  <td className="flex gap-2 px-2 py-2">
                    <button
                      className="text-red-700 cursor-pointer bg-white rounded-md px-2"
                      onClick={() => {
                        if (
                          confirm("Are you sure you want to delete this event?")
                        ) {
                          deleteEvent(event.EventID);
                        }
                      }}
                    >
                      {loading.state && loading.id == event.EventID
                        ? "deleting..."
                        : <MdDelete size={20} aria-label="Delete Event" /> } 
                         
                    </button>
                    <button
                    className="bg-white rounded-md text-black p-2"
                      onClick={(e) => {
                        e.preventDefault();
                        form.setFieldValue("EventName", event.EventName);
                        form.setFieldValue("Description", event.Description);
                        form.setFieldValue(
                          "StartDateTime",
                          event.StartDateTime,
                        );
                        form.setFieldValue("EndDateTime", event.EndDateTime);
                        form.setFieldValue("Location", event.Location);
                        form.validateAllFields("change");

                        setEventId(event.EventID);
                        setUpdateOrSubmitState(true);
                      }}
                    >
                      <GrUpdate size={20} aria-label="Update Event" />
                    </button>
                    <button className="bg-white rounded-md text-black px-2" onClick={()=>{
                      navigate(`/clubAdmin/event/${event.EventID}`)
                    }}><CgMoreO size={20} aria-label="View Event Details" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

      </div>
    </div>
    
    </>
  );
};
export default EventCreation;
