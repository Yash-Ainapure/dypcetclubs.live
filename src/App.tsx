import Navbar from "./appComponents/Navdar.jsx";
import Hero from "./appComponents/Herosection.js";
import Clubs from "./appComponents/Clubs";
import Demo from "./appComponents/Demo.js";

import Particles from "@/components/magicui/particles";
import Meteors from "@/components/magicui/meteors";
import Events from "./appComponents/Events.js";

// bg-gradient-to-t from-gray-950 via-purple-950 via-blue-950 to-gray-950
// bg-gradient-to-t from-blue-950 via-gray-800 via-purple-900 to-black
// bg-gradient-to-t from-gray-950 via-purple-950 via-voilet-950 via-indigo-950 via-blue-950 via-purple-950 to-black
function App() {

  return (
    <div className="bg-gradient-to-tr from-[#050c1f] via-gray-950 via-indigo-950 to-gray-950">
      {/* <Demo /> */}
      <div className="relative overflow-hidden">
        <Meteors number={60} />
        <Particles
          className="absolute inset-0"
          quantity={400}
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
