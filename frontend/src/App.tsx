import { useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Outlet,
} from "react-router-dom";
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
import Footer from "./appComponents/Footer"; 

import { Navbar } from "./appComponents/Navbar";
import About from "./appComponents/About";

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [showLoginPage, setShowLoginPage] = useState(false);

  const handleClose = () => {
    setShowPopup(false);
  };

  const numberOfMeteors = window.innerWidth >= 768 ? 70 : 10;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-black font-popins">
              <Outlet />
              <div className="relative overflow-hidden">
                <Meteors number={numberOfMeteors} />
                <Particles
                  className="absolute inset-0"
                  quantity={400}
                  ease={40}
                  color={"#ffffff"}
                  refresh
                />
                <Navbar setShowLoginPage={setShowLoginPage} />
                <Hero />
              </div>
              <Clubs />
              <Events />
              {showPopup && <Popup onClose={handleClose} />}
              {showLoginPage && <ClubLogin onClose={setShowLoginPage} />}
            </div>
          }
        >
          <Route path="registerClub" element={<ClubRegistration />} />
        </Route>
        <Route path="/clubAdmin/*" element={<ClubAdmin />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
