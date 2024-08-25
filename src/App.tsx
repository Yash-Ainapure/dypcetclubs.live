import Navbar from "./appComponents/Navdar.jsx";
import Hero from "./appComponents/Herosection.js";
import Clubs from "./appComponents/Clubs";
import Demo from "./appComponents/Demo.js";

import Particles from "@/components/magicui/particles";
import Meteors from "@/components/magicui/meteors";
import Events from "./appComponents/Events.js";
import './appComponents/apx.js'

//popins font
// bg-gradient-to-t from-gray-950 via-purple-950 via-blue-950 to-gray-950
// bg-gradient-to-t from-blue-950 via-gray-800 via-purple-900 to-black
// bg-gradient-to-t from-gray-950 via-purple-950 via-voilet-950 via-indigo-950 via-blue-950 via-purple-950 to-black
// md:bg-gradient-to-tr md:from-[#050c1f] md:via-gray-950 md:via-indigo-950 md:to-gray-950
function App() {
  const numberOfMeteors = window.innerWidth >= 768 ? 60 : 10;
  const numberOfParticles = window.innerWidth >= 768 ? 400 : 100;
  return (
    <div className="bg-black font-popins">
      <div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
        <div className="z-50 circle"></div>
      </div>
      {/* <Demo /> */}
      <div className="relative min-h-screen overflow-hidden">
        <Meteors number={numberOfMeteors} />
        <Particles
          className="absolute inset-0"
          quantity={numberOfParticles}
          ease={40}
          color="#ffffff"
          refresh
        />
        <Navbar />
        <Hero />
      </div>
      <Clubs />
      <Events />
    </div>
  );
}

export default App;
