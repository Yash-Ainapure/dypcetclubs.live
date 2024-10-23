import React, { useRef, useState } from "react";
import axios from "./axiosInstance";
import { useForm } from "@tanstack/react-form";
import type { FieldApi } from "@tanstack/react-form";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { autoGrow } from "@/lib/utils";
import {Eye, EyeOff} from "lucide-react"
// Define a TypeScript interface for the club
interface Club {
  ClubName: string;
  Description: string;
  FoundedDate: string; // Optional, formatted as a string "YYYY-MM-DD"
  Email: string;
  Password: string;
  LogoURL: unknown;
}

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

// Define a mutation function that sends a POST request to add a new club
const addClub = async (newClub: Club): Promise<Club> => {
  console.log(newClub);
  const response = await axios.post<Club>(
    "/api/clubs/addClub",
    newClub,
  );
  console.log("club added successfully");
  return response.data;
};

const ClubRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [displayModal, setDisplayModal] = useState(false);
  const [hidden, setHidden] = useState(true);

  const form = useForm({
    defaultValues: {
      ClubName: "",
      Description: "",
      FoundedDate: "", // Optional, formatted as a string "YYYY-MM-DD"
      Email: "",
      Password: "",
      LogoURL: null,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      try {
        const response = await addClub(value);
        console.log("response")
        console.log(response)
        setDisplayModal(true);
        handleClick();
      } catch (e:any) {
        alert("Error: " + e.message);
        return;
      }
    },
  });

  const handleClick = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const togglePasswordVisibility = () => {
    setHidden( !hidden );
  };

  return (
    <div className="absolute h-full w-full flex items-center justify-center">
      <div className="absolute bg-black opacity-40 z-[11] w-full h-full"></div>
      <div className="bg-white rounded-3xl relative flex flex-col gap-4 z-20 items-center justify-center px-8 py-4 ">
        {/* <img src="" alt="close" /> */}
        <div className="flex items-center justify-end w-full ">
          <h1 className="text-2xl font-bold underline grow text-center ml-4">
            Club Registration Form
          </h1>
          <img
            width="30"
            height="30"
            className="m-2 self-end cursor-pointer"
            onClick={() => navigate("/")}
            src="https://img.icons8.com/pastel-glyph/128/cancel--v1.png"
            alt="cancel--v1"
          />
        </div>
        <form
          className="flex flex-col gap-4 p-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 gap-2">
            {/* A type-safe field component*/}
            <div className="">
              <form.Field
                name="ClubName"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Club  Name is required" : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value.includes("error") &&
                      'No "error" allowed in ClubName'
                    );
                  },
                }}
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <>
                      {/* <label htmlFor={field.name}>ClubName:</label> */}
                      <input
                        placeholder="Club Name"
                        className="p-2 glass shadow-2xl border border-gray-300  w-full placeholder:text-gray outline-none focus:border-black focus:border-[1px] border-[#035ec5]"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <div className="text-red-600 text-sm ml-2">
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
                    !value ? "A Description is required" : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value?.includes("error") &&
                      'No "error" allowed in first name'
                    );
                  },
                }}
                children={(field) => {
                  const descriptionRef = useRef(null);
                  const handleInput = () => {
                    if (descriptionRef && typeof descriptionRef !== "function") {
                      autoGrow(descriptionRef);
                    }
                  };
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <>
                      {/* <label htmlFor={field.name}>Description:</label> */}
                      <textarea
                        placeholder="Description"
                        className="p-2 glass resize-none max-h-24 h-12 shadow-2xl border border-gray-300  w-full placeholder:text-gray outline-none focus:border-black focus:border-[1px] border-[#035ec5]"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onInput={handleInput}
                        ref={descriptionRef}
                      />
                      <div className="text-red-600 text-sm ml-2">
                        <FieldInfo field={field} />
                      </div>
                    </>
                  );
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 ">
            <div>
              <form.Field
                name="FoundedDate"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "FoundedDate is required" : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value.includes("error") &&
                      'No "error" allowed in first name'
                    );
                  },
                }}
                children={(field) => {
                  const [isFocused,setIsFocused] = useState(false);

                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <>
                      <input
                        placeholder="Founded Date (DD/MM/YYYY)"
                        className="p-2 shadow-xl  glass border border-gray-300 h-12  w-full placeholder:text-gray outline-none focus:border-black focus:border-[1px]  border-[#035ec5]"
                        type={isFocused ? "date" : "text"}  
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}  
                      />
                      <div className="text-red-600 text-sm ml-2">
                        <FieldInfo field={field} />
                      </div>
                    </>
                  );
                }}
              />
            </div>
          </div>
          <div>
            <form.Field
              name="Email"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Email is required" : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes("error") &&
                    'No "error" allowed in first name'
                  );
                },
              }}
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <>
                    {/* <label htmlFor={field.name}>Email:</label> */}
                    <input
                      placeholder="Email"
                      className="p-2  border border-gray-300  shadow-xl w-full placeholder:text-gray outline-none focus:border-black focus:border-[1px] border-[#035ec5]"
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <div className="text-red-600 text-sm ml-2">
                      <FieldInfo field={field} />
                    </div>
                  </>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="Password"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "Password is required"
                    : value.length < 6
                    ? "Password must be at least 6 characters"
                    : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes("error") && 'No "error" allowed in Password'
                  );
                },
              }}
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <>
                    {/* <label htmlFor={field.name}>Password:</label> */}
                    <div className="relative">
                    <input
                      className="p-2 glass shadow-xl border border-gray-300  w-full placeholder:text-gray outline-none focus:border-black focus:border-[1px] border-[#035ec5]"
                      type={ hidden ? "password" : "text"}
                      id={field.name}
                      placeholder="Password"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs"                    
                    > 
                    { hidden ? <EyeOff size={17} /> : <Eye size={17}/>}
                    </button>
                    </div>
                    
                    <div className="text-red-600 text-sm ml-2">
                                <FieldInfo field={field} />
                    </div>
                  </>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="LogoURL"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Logo is required" : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }: any) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value &&
                    value.name.includes("error") &&
                    'No "error" allowed in LogoURL   '
                  );
                },
              }}
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      className="p-2 glass shadow-xl border border-gray-300 w-full placeholder:text-gray outline-none focus:border-black focus:border-[1px] border-[#035ec5]"
                      id={field.name}
                      name={field.name}
                      // value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e: any) => {
                        const file = e.target.files[0];
                        if (file) {
                          field.handleChange(file); // Store the File object directly
                        } else {
                          field.handleChange(null); // Reset if no file selected
                        }
                      }}
                    />
                    <div className="text-red-600 text-sm ml-2">
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
                className="outline-none cursor-pointer glass border-slate-50 border shadow-xl tracking-wider leading-8  w-full p-2 bg-gray-900 text-white text-xl font-bold hover:bg-slate-50 hover:text-stone-950  hover:border-black hover:border-solid hover:border-[1px]  hover:text-[#035ec5] font-bold"
                type="submit"
                disabled={!canSubmit}
              >
                {isSubmitting ? "Submiting..." : "Register"}
              </button>
            )}
          />
        </form>
      </div>

      {displayModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="max-w-sm bg-white rounded-lg shadow-lg w-80">
            <div className="flex justify-end pt-2 pr-4 ">
              <button
                className="right-0 text-2xl font-semibold text-red-500 top-2"
                onClick={() => {
                  setDisplayModal(false);
                  navigate("/");
                }}
              >
                x
              </button>
            </div>
            <div className="p-6">
              <p className="mb-4 text-lg font-semibold text-center">
                Club registered successfully!
              </p>
              <p className="mb-4 text-center text-gray-700">
                We will approve it and reach out to you soon through
                WhatsApp/email. Thanks!
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ClubRegistration;
