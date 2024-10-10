import { useState } from "react";
import logo from "../assets/dypLogo.png";
import { Dock, DockIcon } from "@/components/magicui/dock";
import cross from "../assets/cross-icon.svg";
import burger from "../assets/burger-menu.svg";

export type IconProps = React.HTMLAttributes<SVGElement>;

const Navbar: React.FC<any> = ({ setShowLoginPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="relative flex items-center justify-between w-full px-4 py-4 text-slate-300 md:h-28 sm:px-6 lg:px-8">
      {/* image-logo */}
      <div className="z-10 flex items-center gap-2">
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-8 transition-all duration-500 transform cursor-pointer md:h-16 md:w-16 hover:scale-110"
        />
        <h2 className="text-xl font-bold transition-all duration-500 transform cursor-pointer hover:text-white hover:scale-105">
          dypcetclubs.live
        </h2>
      </div>
      <div className=" transform bg-[#060f1c] bg-gradient-to-b from-[rgb(10,17,27)] to-[#010a18] sticky top-6 transition-all duration-500 hover:left-[34%] left-[35%] w-[550px] hover:w-[600px]">
        <Dock
          direction="middle"
          magnification={60}
          distance={100}
          className="hidden lg:flex items-center w-full text-base border rounded-lg shadow-xl bg-white/10 backdrop-blur-sm border-white/20"
        >
          <DockIcon>
            <p className="flex items-center font-semibold transition-all duration-300 transform size-full">
              Home
            </p>
          </DockIcon>
          <DockIcon>
            <p className="flex items-center font-semibold transition-all duration-300 transform size-full">
              Clubs
            </p>
          </DockIcon>
          <DockIcon>
            <p className="flex items-center font-semibold transition-all duration-300 transform size-full">
              Events
            </p>
          </DockIcon>
          <DockIcon>
            <p className="flex items-center font-semibold transition-all duration-300 transform size-full">
              Hiring
            </p>
          </DockIcon>
        </Dock>
      </div>
      <div className="z-20 transform transition-all duration-500 fixed top-4 right-4 md:hidden">
        <button onClick={toggleMenu}>
          <img
            src={isMenuOpen ? cross : burger}
            width={50}
            height={50}
            alt={isMenuOpen ? "Close Menu" : "Open Menu"}
          />
        </button>
      </div>

     
     {isMenuOpen && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-6xl font-bold font-pixeboy z-[1001]">
          <button className="absolute top-5 right-5" onClick={toggleMenu}>
            <img
              src={cross}
              width={75}
              height={75}
              alt="Close Menu"
            />
          </button>
        
          <ul className="flex flex-col gap-8 mt-12 text-black">
            <li className="hover:underline cursor-pointer text-center ">Home</li>
            <li className="hover:underline cursor-pointer text-center ">Clubs</li>
            <li className="hover:underline cursor-pointer text-center ">Events</li>
            <li className="hover:underline cursor-pointer text-center ">Hiring</li>
          </ul>
        </div>
      )}
      <div
        onClick={() => {
          setShowLoginPage(true);
        }}
        className="mr-[15vw] lg:mr-0 text-base rounded-md shadow-xl text-black bg-white border-white border p-2 font-semibold cursor-pointer hover:scale-105 transform transition-all duration-500 hover:bg-transparent hover:text-white"
      >
        Club login
      </div>
    </div>
  );
};

export default Navbar;
