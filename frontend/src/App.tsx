import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Navigation } from "./appComponents/Navbar";

import Hero from "./appComponents/Herosection";
import Clubs from "./appComponents/Clubs";
import Particles from "@/components/magicui/particles";
import Meteors from "@/components/magicui/meteors";
import Events from "./appComponents/Events";
import Popup from "./appComponents/Popup";
import ClubRegistration from "./appComponents/ClubRegistration";
import ClubLogin from "./appComponents/ClubLogin";
import { ClubAdmin } from "./appComponents/ClubAdmin";
import "./App.css";
import QuizPage from "./appComponents/QuizPage";
import About from "./appComponents/About";
import Footer from "./appComponents/Footer.tsx";
import ClubsPage from "./appComponents/ClubsPage.tsx";
import EventsPage from "./appComponents/EventsPage.tsx";
import HiringPage from "./appComponents/HiringPage.tsx";
import PrivacyPolicy from "./appComponents/PrivacyPolicy.tsx";
import Terms from "./appComponents/Terms.tsx";
import { useAuth } from "./context/AuthContext"; // Import the Auth context
import ClubDetails from "./appComponents/ClubDetails.tsx";
import AddClubMembers from "./appComponents/AddClubMembers.tsx";

function App() {
  const { isLoggedIn } = useAuth(); // Access the authentication state
  const [showPopup, setShowPopup] = useState(true);
  const [showLoginPage, setShowLoginPage] = useState(false);

  const handleClose = () => {
    setShowPopup(false);
  };

  const numberOfMeteors = window.innerWidth >= 768 ? 70 : 10;

  return (
    <Router>
      <div className="bg-black font-popins">
        
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <>
              <Navigation setShowLoginPage={setShowLoginPage} />
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
                  {showPopup && <Popup onClose={handleClose} />}
                  {showLoginPage && <ClubLogin onClose={setShowLoginPage} />}
                </div>
              </div>
              </>
            }
          />
          <Route path="registerClub" element={<ClubRegistration />} />
          <Route path="/clubboard" element={<ClubsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/clubs/:clubId" element={<ClubDetails />} />

          {/* Routes accessible only to logged-in users */}
          {isLoggedIn && (
            <>
              <Route path="/clubAdmin/*" element={<ClubAdmin />} />
              <Route path="/quiz/:id" element={<QuizPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/clubAdmin/hiring" element={<HiringPage />} />
              <Route path="/clubAdmin/addMember" element={<AddClubMembers/>}/>
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
