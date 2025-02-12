import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Navigation } from "./appComponents/Navbar";

import Hero from "./appComponents/Herosection";
import Clubs from "./appComponents/Clubs";
import Particles from "@/components/magicui/particles";
import Meteors from "@/components/magicui/meteors";
import Events from "./appComponents/Events";
import Popup from "./appComponents/Popup";
import ClubLogin from "./appComponents/ClubLogin";
import { ClubAdmin } from "./appComponents/ClubAdmin";
import "./App.css";
import About from "./appComponents/About";
import Footer from "./appComponents/Footer.tsx";
import ClubsPage from "./appComponents/ClubsPage.tsx";
import EventsPage from "./appComponents/EventsPage.tsx";
import PrivacyPolicy from "./appComponents/PrivacyPolicy.tsx";
import Terms from "./appComponents/Terms.tsx";
import ErrorPage from "./appComponents/Error.tsx";
import ClubDetails from "./appComponents/ClubDetails.tsx";
import QuizPage from "./appComponents/QuizPage.tsx";
import HiringPage from "./appComponents/HiringPage.tsx";
// import PWAPrompt from "./appComponents/PWAPrompt.tsx";
// import PWADebug from "./appComponents/PWADebug";

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const handleClose = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (
      !window.location.pathname.startsWith("/clubAdmin") &&
      showNavbar === false
    ) {
      console.log("setting navbar to true");
      setShowNavbar(true);
    }
  }, []);

  const numberOfMeteors = window.innerWidth >= 768 ? 70 : 10;

  return (
    <Router>
      {showPopup && <Popup onClose={handleClose} />}
      {showLoginPage && (
        <ClubLogin onClose={setShowLoginPage} handleClosePopup={handleClose} />
      )}
      {showNavbar && <Navigation setShowLoginPage={setShowLoginPage} />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="bg-black font-popins">
                <div className="relative overflow-hidden">
                  <Meteors number={numberOfMeteors} />
                  <Particles
                    className="absolute inset-0"
                    quantity={400}
                    ease={40}
                    color={"#ffffff"}
                    refresh
                  />
                  <Hero />
                  <Clubs />
                  <Events />
                  <Footer />
                  {/* <PWAPrompt /> */}
                  {/* <PWADebug /> */}
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/clubAdmin/*"
          element={<ClubAdmin setShowNavbar={setShowNavbar} />}
        />
        {/* <Route path="/registerClub" element={<ClubRegistration />} /> */}
        <Route path="/clubboard" element={<ClubsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/hiring" element={<HiringPage />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/clubs/:clubId" element={<ClubDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

