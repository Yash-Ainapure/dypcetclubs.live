import React, { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import type { FieldApi } from "@tanstack/react-form";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

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
            `http://localhost:4000/api/events/create-event?ClubID=${clubInfo?.ClubID}`,
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
            `http://localhost:4000/api/events/update-event?ClubID=${clubInfo?.ClubID}`,
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
      axios
        .get(
          `http://localhost:4000/api/events/getClubEventData?ClubID=${userData.club.ClubID}`,
        )
        .then((response) => {
          setEventData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (userData) {
      setClubInfo(userData.club);
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
        `http://localhost:4000/api/events/deleteEvent?ClubID=${clubInfo?.ClubID}`,
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

  return (
    <div className="w-full h-full bg-slate-500 rounded-tl-2xl p-2">
      <div className="flex justify-around items-center flex-col gap-4 min-h-screen">
        <form
          className="flex flex-col gap-4 p-4 border border-black rounded-xl items-center w-fit bg-slate-400"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
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
        <div className="flex flex-col gap-4 items-end">
          <p className="text-white font-semibold text-lg pl-4 self-start">
            Events Created by you:{" "}
          </p>
          <table>
            <thead>
              <tr>
                <th className="bg-gray-300 py-2 pl-8 pr-2 rounded-tl-2xl">
                  EventName
                </th>
                <th className="bg-gray-300 p-2">Description</th>
                <th className="bg-gray-300 p-2">StartDateTime</th>
                <th className="bg-gray-300 p-2">EndDateTime</th>
                <th className="bg-gray-300 p-2">Location</th>
                <th className="bg-gray-300 py-2 pr-8 pl-2 rounded-tr-2xl">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody>
              {eventData?.map((event: any) => (
                <tr
                  className="border-b-2 bg-[#121b22] text-white"
                  key={event.id}
                >
                  <td className="px-2 border-r py-2">{event.EventName}</td>
                  <td className="px-2 border-r">{event.Description}</td>
                  <td className="px-2 border-r">{event.StartDateTime}</td>
                  <td className="px-2 border-r">{event.EndDateTime}</td>
                  <td className="px-2 border-r">{event.Location}</td>
                  <td className="flex gap-2 px-2 py-2">
                    <button
                      className="text-red-500 cursor-pointer"
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
                        : "Delete"}
                    </button>
                    <button
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
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="bg-black text-white font-semibold rounded-md p-1 w-36">
            {" "}
            Create new Event{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
export default EventCreation;
