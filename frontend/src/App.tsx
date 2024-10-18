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
import ErrorPage from "./appComponents/Error.tsx";

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [showLoginPage, setShowLoginPage] = useState(false);

  const handleClose = () => {
    setShowPopup(false);
  };

  const numberOfMeteors = window.innerWidth >= 768 ? 70 : 10;

  return (
    <Router>
      <div className="bg-black font-popins">
        <Navigation setShowLoginPage={setShowLoginPage} />
        <Routes>
          <Route
            path="/"
            element={
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
            }
          >
            <Route path="registerClub" element={<ClubRegistration />} />           
          </Route>        
          <Route path="/clubAdmin/*" element={<ClubAdmin />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/clubboard" element={<ClubsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/hiring" element={<HiringPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
