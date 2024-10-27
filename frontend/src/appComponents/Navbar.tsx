import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/dypLogo.png";
import { Dock, DockIcon } from "@/components/magicui/dock";
import cross from "../assets/cross-icon.svg";
import burger from "../assets/burger-menu.svg";

export type IconProps = React.HTMLAttributes<SVGElement>;

const Navigation = ({ setShowLoginPage, isLoggedIn }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="">
      {/* Logo and Title at top-left corner */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10 transition-all duration-500 transform cursor-pointer md:h-16 md:w-16 hover:scale-110"
        />
        <h2 className="text-md md:text-xl font-bold transition-all duration-500 text-white transform cursor-pointer hover:text-white hover:scale-105">
          dypcetclubs.live
        </h2>
      </div>

      {/* Dock for larger screens */}
      <div className="z-20 transform transition-all duration-500 fixed top-8 hover:left-[34%] left-[35%] w-[550px] hover:w-[600px]">
        <Dock
          direction="middle"
          magnification={60}
          distance={100}
          className="hidden   lg:flex items-center w-full text-base border rounded-lg shadow-xl bg-black/10 backdrop-blur-sm border-white/20"
        >
          <DockIcon>
            <p className="flex items-center text-white font-semibold transition-all duration-300 transform size-full cursor-pointer" onClick={() => navigate("/")}>
              Home
            </p>
          </DockIcon>
          <DockIcon>
            <p className="flex items-center text-white font-semibold transition-all duration-300 transform size-full cursor-pointer" onClick={() => navigate("/clubboard")}>
              Clubs
            </p>
          </DockIcon>
          <DockIcon>
            <p className="flex items-center text-white font-semibold transition-all duration-300 transform size-full cursor-pointer" onClick={() => navigate("/events")}>
              Events
            </p>
          </DockIcon>
          <DockIcon>
            <p className="flex items-center text-white font-semibold transition-all duration-300 transform size-full cursor-pointer" onClick={() => navigate("/hiring")}>
              Hiring
            </p>
          </DockIcon>
          <DockIcon>
            <p className="flex items-center text-white font-semibold transition-all duration-300 transform size-full cursor-pointer" onClick={() => navigate("/about")}>
              About
            </p>
          </DockIcon>
        </Dock>
      </div>

      {/* Conditionally render Club login button if not logged in */}
      {!isLoggedIn && (
        <div
          onClick={() => setShowLoginPage(true)}
          className="text-base rounded-md shadow-xl text-black bg-white border-white border py-2 px-4 font-semibold cursor-pointer hover:scale-105 transform transition-all duration-500 hover:bg-transparent hover:text-white absolute top-8 right-4 z-[11] hidden md:block"
        >
          Club login
        </div>
      )}

      {/* Mobile menu toggle button */}
      <div className="z-20 fixed top-6 flex right-4 md:hidden">
        <button onClick={toggleMenu}>
          <img
            src={isMenuOpen ? cross : burger}
            width={25}
            height={25}
            alt={isMenuOpen ? "Close Menu" : "Open Menu"}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col  w-3/5 h-4/4 items-center text-smmd:text-6xl font-bold font-pixeboy z-[1001] text-white">
          <button className="absolute top-5 left-5" onClick={toggleMenu}>
            <img src={cross} width={25} height={25} alt="Close Menu" className="bg-white"/>
          </button>

          <ul className="flex flex-col gap-6 md:gap-8 mt-12">
            <li
              onClick={() => {
                navigate("/");
                toggleMenu();
              }}
              className="hover:underline cursor-pointer text-center"
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/clubboard");
                toggleMenu();
              }}
              className="hover:underline cursor-pointer text-center"
            >
              Clubs
            </li>
            <li
              onClick={() => {
                navigate("/events");
                toggleMenu();
              }}
              className="hover:underline cursor-pointer text-center"
            >
              Events
            </li>
            <li
              onClick={() => {
                navigate("/hiring");
                toggleMenu();
              }}
              className="hover:underline cursor-pointer text-center"
            >
              Hiring
            </li>
            <li
              onClick={() => {
                navigate("/about");
                toggleMenu();
              }}
              className="hover:underline cursor-pointer text-center"
            >
              About
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export { Navigation };
