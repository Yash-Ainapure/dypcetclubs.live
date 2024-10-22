"use client";

import { useState } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import logo from "../assets/dypLogo.png";
import cross from "../assets/cross-icon.svg";
import burger from "../assets/burger-menu.svg";
import { useNavigate } from "react-router-dom";

const HeroNavbar: React.FC<{ setShowLoginPage?: (show: boolean) => void }> = ({ setShowLoginPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative z-10 flex flex-col w-full overflow-hidden text-white bg-background md:shadow-xl">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-start py-24">
        <h1 className="px-4 text-4xl lg:text-6xl font-semibold leading-none text-center">
          Welcome to dypcetclubs.live
        </h1>
        <p className="w-3/4 lg:w-2/5 pt-4 text-center md:text-xl">
          Discover the vibrant community of clubs at our college, where students
          come together to explore their passions, learn new skills, and make
          lasting connections.
        </p>
        <div className="flex flex-col justify-center gap-4 pt-12 md:flex-row text-slate-200">
          <button className="h-12 px-6 py-2 font-semibold text-black bg-white rounded-md hover:scale-105 transform transition-all duration-500 hover:text-white hover:bg-black hover:border ">
            Explore Clubs
          </button>
          <button className="h-12 px-6 py-2 font-semibold border border-white rounded-md hover:scale-105 transform transition-all duration-500 hover:text-black hover:bg-white hover:border ">
            Upcoming Events
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="relative flex items-center justify-between w-full px-4 py-4 text-slate-300 bg-black md:h-28 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="z-10 flex items-center gap-2">
          {/* <a href="https://dypcetclubs-live.vercel.app">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-8 transition-all duration-500 transform cursor-pointer md:h-16 md:w-16 hover:scale-110"
            />
          </a> */}
          {/* <a href="https://dypcetclubs-live.vercel.app">
            <h2 className="text-xl font-bold transition-all duration-500 transform cursor-pointer hover:text-white hover:scale-105">
              dypcetclubs.live
            </h2>
          </a> */}
        </div>

        {/* Club login button */}
        {setShowLoginPage && (
          <div
            onClick={() => setShowLoginPage(true)}
            className="text-base rounded-md shadow-xl text-black bg-white border-white border p-2 font-semibold cursor-pointer hover:scale-105 transform transition-all duration-500 hover:bg-transparent hover:text-white"
          >
            Club login
          </div>
        )}

        {/* Dock for larger screens */}
        <div className="z-20 transform transition-all duration-500 fixed top-8 hover:left-[34%] left-[35%] w-[550px] hover:w-[600px]">
          <Dock
            direction="middle"
            magnification={60}
            distance={100}
            className="hidden lg:flex items-center w-full text-base border rounded-lg shadow-xl bg-white/10 backdrop-blur-sm border-white/20"
          >
            <DockIcon>
              <p className="flex items-center text-white font-semibold transition-all duration-300 transform size-full cursor-pointer" onClick={() => navigate("/")}>
                Home
              </p>
            </DockIcon>
            <DockIcon>
              <p className="flex items-center text-white font-semibold transition-all duration-300 transform size-full cursor-pointer" onClick={() => navigate("/clubs")}>
                Clubs
              </p>
            </DockIcon>
            <DockIcon>
              <p className="flex items-center text-white font-semibold transition-all duration-300 transform size-full cursor-pointer" onClick={() => navigate("/event")}>
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

        {/* Mobile menu toggle button */}
        <div className="z-20 fixed top-4 right-4 md:hidden">
          <button onClick={toggleMenu}>
            <img
              src={isMenuOpen ? cross : burger}
              width={50}
              height={50}
              alt={isMenuOpen ? "Close Menu" : "Open Menu"}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center text-6xl font-bold font-pixeboy z-[1001] text-white">
          <button className="absolute top-5 right-5" onClick={toggleMenu}>
            <img
              src={cross}
              width={75}
              height={75}
              alt="Close Menu"
            />
          </button>

          <ul className="flex flex-col gap-8 mt-12">
            <li onClick={() => { navigate("/"); toggleMenu(); }} className="hover:underline cursor-pointer text-center">Home</li>
            <li onClick={() => { navigate("/clubs"); toggleMenu(); }} className="hover:underline cursor-pointer text-center">Clubs</li>
            <li onClick={() => { navigate("/event"); toggleMenu(); }} className="hover:underline cursor-pointer text-center">Events</li>
            <li onClick={() => { navigate("/hiring"); toggleMenu(); }} className="hover:underline cursor-pointer text-center">Hiring</li>
            <li onClick={() => { navigate("/about"); toggleMenu(); }} className="hover:underline cursor-pointer text-center">About</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeroNavbar;
