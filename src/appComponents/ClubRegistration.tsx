import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'
import { useNavigate } from 'react-router-dom';
import confetti from "canvas-confetti";

// Define a TypeScript interface for the club
interface Club {
   ClubName: string;
   Description: string;
   FoundedDate: string; // Optional, formatted as a string "YYYY-MM-DD"
   Email: string;
   Password: string;
   LogoURL: string;
}

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
   return (
      <>
         {field.state.meta.isTouched && field.state.meta.errors.length ? (
            <em>{field.state.meta.errors.join(", ")}</em>
         ) : null}
         {field.state.meta.isValidating ? 'Validating...' : null}
      </>
   )
}

// Define a mutation function that sends a POST request to add a new club
const addClub = async (newClub: Club): Promise<Club> => {
   const response = await axios.post<Club>('http://localhost:4000/addClub', newClub);
   console.log("club added successfully")
   return response.data;
};

const ClubRegistration: React.FC = () => {
   const navigate = useNavigate();
   const [displayModal, setDisplayModal] = useState(false);
   const form = useForm({
      defaultValues: {
         ClubName: '',
         Description: '',
         FoundedDate: '', // Optional, formatted as a string "YYYY-MM-DD"
         Email: '',
         Password: '',
         LogoURL: '',
      },
      onSubmit: async ({ value }) => {
         // Do something with form data
         console.log(value)
         try {
            const response = await addClub(value);
            console.log("response")
            console.log(response)
            setDisplayModal(true);
            handleClick()
         } catch (e: any) {
            alert("Error: " + e.message);
            console.log(e);
            return;
         }
      },
   })

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

   return (
      <div>
         <div className='flex flex-col items-center justify-center min-h-screen'>
            <h1 className='text-2xl font-semibold underline'>Club Registration Form</h1>
            <form
               className='flex flex-col gap-4 p-4'
               onSubmit={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  form.handleSubmit()
               }}
            >
               <div>
                  {/* A type-safe field component*/}
                  <form.Field
                     name="ClubName"
                     validators={{
                        onChange: ({ value }) =>
                           !value
                              ? 'ClubName is required'
                              : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async ({ value }) => {
                           await new Promise((resolve) => setTimeout(resolve, 1000))
                           return (
                              value.includes('error') &&
                              'No "error" allowed in ClubName'
                           )
                        },
                     }}
                     children={(field) => {
                        // Avoid hasty abstractions. Render props are great!
                        return (
                           <>
                              <label htmlFor={field.name}>ClubName:</label>
                              <input
                                 className='mx-2 border rounded-md'
                                 id={field.name}
                                 name={field.name}
                                 value={field.state.value}
                                 onBlur={field.handleBlur}
                                 onChange={(e) => field.handleChange(e.target.value)}
                              />
                              <div className='text-red-600'>
                                 <FieldInfo field={field} />
                              </div>
                           </>
                        )
                     }}
                  />
               </div>
               <div>
                  <form.Field
                     name="Description"
                     validators={{
                        onChange: ({ value }) =>
                           !value
                              ? 'A Description is required'
                              : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async ({ value }) => {
                           await new Promise((resolve) => setTimeout(resolve, 1000))
                           return (
                              value.includes('error') &&
                              'No "error" allowed in first name'
                           )
                        },
                     }}
                     children={(field) => {
                        // Avoid hasty abstractions. Render props are great!
                        return (
                           <>
                              <label htmlFor={field.name}>Description:</label>
                              <input
                                 className='mx-2 border rounded-md'
                                 id={field.name}
                                 name={field.name}
                                 value={field.state.value}
                                 onBlur={field.handleBlur}
                                 onChange={(e) => field.handleChange(e.target.value)}
                              />
                              <div className='text-red-600'>
                                 <FieldInfo field={field} />
                              </div>
                           </>
                        )
                     }}
                  />
               </div>
               <div>
                  <form.Field
                     name="FoundedDate"
                     validators={{
                        onChange: ({ value }) =>
                           !value
                              ? 'FoundedDate is required'
                              : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async ({ value }) => {
                           await new Promise((resolve) => setTimeout(resolve, 1000))
                           return (
                              value.includes('error') &&
                              'No "error" allowed in first name'
                           )
                        },
                     }}
                     children={(field) => {
                        // Avoid hasty abstractions. Render props are great!
                        return (
                           <>
                              <label htmlFor={field.name}>FoundedDate:</label>
                              <input
                                 className='p-2 mx-2 border rounded-md'
                                 type='date'
                                 id={field.name}
                                 name={field.name}
                                 value={field.state.value}
                                 onBlur={field.handleBlur}
                                 onChange={(e) => field.handleChange(e.target.value)}
                              />
                              <div className='text-red-600'>
                                 <FieldInfo field={field} />
                              </div>
                           </>
                        )
                     }}
                  />
               </div>
               <div>
                  <form.Field
                     name="Email"
                     validators={{
                        onChange: ({ value }) =>
                           !value
                              ? 'Email is required'
                              : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async ({ value }) => {
                           await new Promise((resolve) => setTimeout(resolve, 1000))
                           return (
                              value.includes('error') &&
                              'No "error" allowed in first name'
                           )
                        },
                     }}
                     children={(field) => {
                        // Avoid hasty abstractions. Render props are great!
                        return (
                           <>
                              <label htmlFor={field.name}>Email:</label>
                              <input
                                 className='mx-2 border rounded-md'
                                 type='email'
                                 id={field.name}
                                 name={field.name}
                                 value={field.state.value}
                                 onBlur={field.handleBlur}
                                 onChange={(e) => field.handleChange(e.target.value)}
                              />
                              <div className='text-red-600'>
                                 <FieldInfo field={field} />
                              </div>
                           </>
                        )
                     }}
                  />
               </div>
               <div>
                  <form.Field
                     name="Password"
                     validators={{
                        onChange: ({ value }) =>
                           !value
                              ? 'Password is required'
                              : value.length < 6
                                 ? 'Password must be at least 6 characters'
                                 : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async ({ value }) => {
                           await new Promise((resolve) => setTimeout(resolve, 1000))
                           return (
                              value.includes('error') &&
                              'No "error" allowed in Password'
                           )
                        },
                     }}
                     children={(field) => {
                        // Avoid hasty abstractions. Render props are great!
                        return (
                           <>
                              <label htmlFor={field.name}>Password:</label>
                              <input
                                 className='mx-2 border rounded-md'
                                 type='password'
                                 id={field.name}
                                 name={field.name}
                                 value={field.state.value}
                                 onBlur={field.handleBlur}
                                 onChange={(e) => field.handleChange(e.target.value)}
                              />
                              <div className='text-red-600'>
                                 <FieldInfo field={field} />
                              </div>
                           </>
                        )
                     }}
                  />
               </div>
               <div>
                  <form.Field
                     name="LogoURL"
                     validators={{
                        onChange: ({ value }) =>
                           !value
                              ? 'LogoURL is required'
                              : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async ({ value }) => {
                           await new Promise((resolve) => setTimeout(resolve, 1000))
                           return (
                              value.includes('error') &&
                              'No "error" allowed in LogoURL   '
                           )
                        },
                     }}
                     children={(field) => {
                        // Avoid hasty abstractions. Render props are great!
                        return (
                           <>
                              <label htmlFor={field.name}>LogoURL:</label>
                              <input
                                 className='mx-2 border rounded-md'
                                 id={field.name}
                                 name={field.name}
                                 value={field.state.value}
                                 onBlur={field.handleBlur}
                                 onChange={(e) => field.handleChange(e.target.value)}
                              />
                              <div className='text-red-600'>
                                 <FieldInfo field={field} />
                              </div>
                           </>
                        )
                     }}
                  />
               </div>

               <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                     <button className='px-4 py-2 font-semibold text-white bg-black rounded-md' type="submit" disabled={!canSubmit}>
                        {isSubmitting ? 'Submiting...' : 'Submit'}
                     </button>

                  )}
               />
            </form>
         </div>

         {
            displayModal ?
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                  <div className="max-w-sm bg-white rounded-lg shadow-lg w-80">
                     <div className='flex justify-end pt-2 pr-4 '>
                        <button className="right-0 text-2xl font-semibold text-red-500 top-2" onClick={() => {
                           setDisplayModal(false)
                           navigate("/")
                        }}>
                           x
                        </button>
                     </div>
                     <div className='p-6'>
                        <p className="mb-4 text-lg font-semibold text-center">Club registered successfully!</p>
                        <p className="mb-4 text-center text-gray-700">
                           We will approve it and reach out to you soon through WhatsApp/email. Thanks!
                        </p>
                     </div>

                  </div>
               </div> : ""
         }


      </div>
   )
}

export default ClubRegistration