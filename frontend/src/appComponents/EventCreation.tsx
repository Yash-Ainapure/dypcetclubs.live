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
import microBG from "../assets/micro1.avif";

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

  const navigate = useNavigate();

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
            }
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
            }
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
      console.log("fetching event data..");
      axios
        .get(`/api/events/getClubEventData?ClubID=${userData?.ClubID}`)
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

  const deleteEvent = async (eventid: any) => {
    setLoading({ state: true, id: eventid });
    try {
      const response = await axios.delete(
        `/api/events/deleteEvent?ClubID=${clubInfo?.ClubID}`,
        {
          data: {
            eventId: eventid,
          },
        }
      );
      if (response.status == 204) {
        alert("Event Deleted Successfully");
        setEventData(
          eventData.filter((event: any) => event.EventID !== eventid)
        );
      }
      setLoading({ state: false, id: null });
    } catch (e: any) {
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
      <div
        className="rounded-tl-2xl rounded-br-2xl border-[#bababa] border-l w-full min-h-screen"
        style={{
          backgroundImage: `url(${microBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" items-center justify-center min-h-screen  ">
          <div className="flex justify-center mt-10">
            <button
              className="p-2 font-semibold text-white bg-black rounded-md w-80 h-12"
              onClick={handleCreateEventClick}
            >
              {" "}
              Create new Event{" "}
            </button>
          </div>
          <div className="fixed w-full h-86 mt-10 overflow-auto justify-center flex ">
            {showForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <form
                  className="flex justify-center flex-col  items-center gap-4 p-4 px-8 rounded-xl w-fit bg-slate-950 bg-opacity-70 text-white"
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                  }}
                  ref={formRef}
                >
                  <div className="">
                    <form.Field
                      name="EventName"
                      validators={{
                        onChange: ({ value }) =>
                          !value ? "EventName is required" : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async ({ value }) => {
                          await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                          );
                          return (
                            value.includes("error") &&
                            'No "error" allowed in EventName'
                          );
                        },
                      }}
                      children={(field) => {
                        return (
                          <>
                            <div className=" p-2 mb-4 ">
                              <span
                                className="flex justify-end cursor-pointer hover:text-red-600 transform transition duration-200"
                                onClick={() => {
                                  setShowForm(false);
                                }}
                              >
                                <ImCross />
                              </span>
                              <span className="text-center justify-center flex text-2xl font-extrabold text-white">
                                New Event
                              </span>
                            </div>
                            <label htmlFor={field.name}>EventName:</label>

                            <input
                              className="mx-2 border rounded-md text-black"
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
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
                    <form.Field
                      name="Description"
                      validators={{
                        onChange: ({ value }) =>
                          !value ? "Description is required" : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async ({ value }) => {
                          await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                          );
                          return (
                            value.includes("error") &&
                            'No "error" allowed in Description'
                          );
                        },
                      }}
                      children={(field) => {
                        return (
                          <>
                            <label htmlFor={field.name}>Description:</label>
                            <input
                              className="mx-2 border rounded-md text-black"
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
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
                    <form.Field
                      name="StartDateTime"
                      validators={{
                        onChange: ({ value }) =>
                          !value ? "StartDateTime is required" : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async ({ value }) => {
                          await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                          );
                          return (
                            value.includes("error") &&
                            'No "error" allowed in StartDateTime'
                          );
                        },
                      }}
                      children={(field) => {
                        return (
                          <>
                            <label htmlFor={field.name}>StartDate:</label>
                            <input
                              className="ml-5 mx-1 border rounded-md text-black"
                              type="datetime-local"
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
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
                    <form.Field
                      name="EndDateTime"
                      validators={{
                        onChange: ({ value }) =>
                          !value ? "EndDateTime is required" : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async ({ value }) => {
                          await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                          );
                          return (
                            value.includes("error") &&
                            'No "error" allowed in EndDateTime'
                          );
                        },
                      }}
                      children={(field) => {
                        return (
                          <>
                            <label htmlFor={field.name}>EndDate:</label>
                            <input
                              className="ml-6 mx-1 border rounded-md text-black"
                              type="datetime-local"
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
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
                    <form.Field
                      name="Location"
                      validators={{
                        onChange: ({ value }) =>
                          !value ? "Location is required" : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async ({ value }) => {
                          await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                          );
                          return (
                            value.includes("error") &&
                            'No "error" allowed in Location'
                          );
                        },
                      }}
                      children={(field) => {
                        return (
                          <>
                            <label htmlFor={field.name}>Location:</label>
                            <input
                              className="ml-6 mx-1 border rounded-md text-black"
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
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
          <div className="flex flex-col items-center gap-4 mt-2 justify-center mx-10">
            <p className="self-start text-xl font-bold">
              Events Created by you:
            </p>
            <div className="overflow-x-auto w-full">
              <table className="min-w-full text-sm text-left bg-white rounded-tl-xl rounded-br-xl">
                <thead className="text-base text-black">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Event Name</th>
                    <th className="px-6 py-3 font-semibold ">Description</th>
                    <th className="px-6 py-3 font-semibold">
                      Start Date & Time
                    </th>
                    <th className="px-6 py-3 font-semibold">End Date & Time</th>
                    <th className="px-6 py-3 font-semibold ">Location</th>
                    <th className="px-6 py-3 font-semibold">Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {eventData?.map((event: any) => (
                    <tr
                      className="text-black hover:bg-slate-200 transition-colors"
                      key={event.id}
                    >
                      <td className="px-6 py-3 border border-gray-300 font-medium text-lg">
                        {event.EventName}
                      </td>
                      <td className="px-6 py-3 border border-gray-300 font-medium">
                        {event.Description}
                      </td>
                      <td className="px-6 py-3 border border-gray-300 font-medium">
                        {event.StartDateTime}
                      </td>
                      <td className="px-6 py-3 border border-gray-300 font-medium">
                        {event.EndDateTime}
                      </td>
                      <td className="px-6 py-3 border border-gray-300 font-medium">
                        {event.Location}
                      </td>
                      <td className="flex gap-3 px-6 py-3 border-t border-gray-300">
                        <button
                          className="text-red-600 cursor-pointer rounded-full p-2 hover:bg-red-700 hover:text-white transition duration-200"
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure you want to delete this event?"
                              )
                            ) {
                              deleteEvent(event.EventID);
                            }
                          }}
                        >
                          {loading.state && loading.id === event.EventID ? (
                            "Deleting..."
                          ) : (
                            <MdDelete size={20} aria-label="Delete Event" />
                          )}
                        </button>
                        <button
                          className="bg-white rounded-full text-blue-600 p-2 hover:bg-blue-700 hover:text-white transition duration-200"
                          onClick={(e) => {
                            e.preventDefault();
                            form.setFieldValue("EventName", event.EventName);
                            form.setFieldValue(
                              "Description",
                              event.Description
                            );
                            form.setFieldValue(
                              "StartDateTime",
                              event.StartDateTime
                            );
                            form.setFieldValue(
                              "EndDateTime",
                              event.EndDateTime
                            );
                            form.setFieldValue("Location", event.Location);
                            form.validateAllFields("change");

                            setEventId(event.EventID);
                            setUpdateOrSubmitState(true);
                          }}
                        >
                          <GrUpdate size={20} aria-label="Update Event" />
                        </button>
                        <button
                          className="bg-white rounded-full text-green-600 p-2 hover:bg-green-700 hover:text-white transition duration-200"
                          onClick={() => {
                            navigate(`/clubAdmin/event/${event.EventID}`);
                          }}
                        >
                          <CgMoreO size={20} aria-label="View Event Details" />
                        </button>
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
