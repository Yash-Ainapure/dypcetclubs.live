import { useState, useEffect } from 'react';
import ClubRegistration from './ClubRegistration';

function Popup({ onClose }: any) {
   const [showRegistrationPage, setShowRegistrationPage] = useState(false);
   const [isOpen, setIsOpen] = useState(false); // Start with the popup closed

   useEffect(() => {
      // Show the popup after 3 seconds (3000 milliseconds)
      const timeout = setTimeout(() => {
         setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timeout);
   }, []);

   const handleClose = () => {
      setIsOpen(false);
      onClose(); // Optional: Execute a function when closing
   };

   const handleOverlayClick = (e: any) => {
      if (e.target === e.currentTarget) {
         handleClose();
      }
   };

   const handleOpenRegistration = () => {
      setShowRegistrationPage(true);
   };

   const handleCloseRegistration = () => {
      setShowRegistrationPage(false);
   };

   if (!isOpen) return null;

   return (
      <div
         className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-100"
         onClick={handleOverlayClick} // Overlay click handler
      >
         <div className="relative w-4/5 max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-lg">
            <button
               onClick={handleClose}
               className="absolute text-gray-600 top-4 right-4 hover:text-gray-800"
            >
               <span className="sr-only">Close</span>
               <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M6 18L18 6M6 6l12 12"
                  />
               </svg>
            </button>

            <div className="text-center">
               <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  Are you a DYPCET club leader?
               </h2>
               <p className="mb-6 text-lg text-gray-600">
                  Register yourself as a club to manage events, announcements, and more.
               </p>

               <div className="flex items-center justify-center gap-4">
                  <button
                     onClick={handleOpenRegistration}
                     className="px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                     Register Now
                  </button>

                  <button
                     onClick={handleClose}
                     className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                  >
                     Maybe Later
                  </button>
               </div>
            </div>
         </div>

         {/* Render ClubRegistration only when showRegistrationPage is true */}
         {showRegistrationPage && (
            <ClubRegistration onClose={handleCloseRegistration} />
         )}
      </div>
   );
}

export default Popup;
