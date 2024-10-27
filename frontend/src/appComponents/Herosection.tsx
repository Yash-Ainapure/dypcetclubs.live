"use client";

import { useState } from "react";
import cross from "../assets/cross-icon.svg";
import burger from "../assets/burger-menu.svg";

const Hero: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

  };

  return (
    <div className="relative z-10 flex flex-col w-full overflow-hidden text-white bg-background md:shadow-xl">
      <div className="flex flex-col items-center justify-start py-40">
        <h1 className="px-4 text-4xl lg:text-6xl font-semibold leading-none text-center">
          Welcome to dypcetclubs.live
        </h1>
        <p className="w-3/4 lg:w-2/5 pt-4 text-center md:text-xl">
          Discover the vibrant community of clubs at our college, where students
          come together to explore their passions, learn new skills, and make
          lasting connections.
        </p>
        <div className="flex flex-col justify-center gap-4 pt-12 md:flex-row text-slate-200">
          <a href="/clubboard">
          <button className="h-12 w-48 px-6 py-2 font-semibold text-black bg-white rounded-md hover:scale-105 transform transition-all duration-500 hover:text-white hover:bg-black hover:border ">
            Explore Clubs
          </button>
          </a>
          <a href="/events">
          <button className="h-12 w-48 px-6 py-2 font-semibold border border-white rounded-md hover:scale-105 transform transition-all duration-500 hover:text-black hover:bg-white hover:border ">
            Upcoming Events
          </button>
          </a>
        </div>
      </div>

{/*       
      <div className="z-20 transform transition-all duration-500 fixed top-8 hover:left-[34%] left-[35%] w-[550px] hover:w-[600px]">
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
            <p className="flex items-center font-semibold transition-all duration-300 transform size-full" onClick={()=>route('/clubboard')}>
              Clubs
            </p>
          </DockIcon>
          <DockIcon>
            <p className="flex items-center font-semibold transition-all duration-300 transform size-full" onClick={()=>route('/events')}>
              Events
            </p>
          </DockIcon>
          <DockIcon>
            <p className="flex items-center font-semibold transition-all duration-300 transform size-full">
              Hiring
            </p>
          </DockIcon>
          <DockIcon >
            <p className="flex items-center font-semibold transition-all duration-300 transform size-full" onClick={()=>route('/about')}>
              Aboutss
            </p>
          </DockIcon>

        </Dock>
      </div> */}

      {/* <div className="z-20 transform transition-all duration-500 fixed top-4 right-4 md:hidden">
        <button onClick={toggleMenu}>
          <img
            src={isMenuOpen ? cross : burger}
            width={50}
            height={50}
            alt={isMenuOpen ? "Close Menu" : "Open Menu"}
          />
        </button>
      </div> */}

     
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



    </div>
  );
};

export default Hero;