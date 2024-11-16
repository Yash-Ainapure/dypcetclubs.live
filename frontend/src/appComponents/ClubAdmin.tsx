"use client";
import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconQuestionMark,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "../context/AuthContext";
import { Routes, Route } from "react-router-dom";
import QuizCreation from "./QuizCreation";
import AdminResults from "./AdminResults";
import EventCreation from "./EventCreation";
// import SettingsPa
import ViewEvent from "./ViewEvent";
import AddClubMembers from "./AddClubMembers";
import axiosInstance from "./axiosInstance";
import AddHiringSession from "./AddHiringSession";
import HiringSessions from "./HiringSessions";
import { ViewSession } from "./ViewSession";
import microBG from "../assets/micro1.avif";

export function ClubAdmin({ setShowNavbar }: any) {
  const { isLoggedIn, userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname.startsWith("/clubAdmin")) {
      setShowNavbar(false);
    }

    if (!isLoggedIn) {
      console.log("Not logged in");
      navigate("/");
    }
  });

  const links = [
    {
      label: "Events",
      href: "/clubAdmin/events",
      icon: (
        <IconUserBolt className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Dashboard",
      href: "/clubAdmin/dashboard",
      icon: (
        <IconBrandTabler className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Hiring",
      href: "/clubAdmin/hiring",
      icon: (
        <IconUserBolt className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Quiz-Creation",
      href: "/clubAdmin/create-quiz",
      icon: (
        <IconQuestionMark className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "/clubAdmin/settings",
      icon: (
        <IconSettings className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "results",
      href: "/clubAdmin/results/4",
      icon: (
        <IconBrandTabler className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "logout",
      href: "/",
      icon: (
        <IconArrowLeft className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-900 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
            {open ? <Logo userData={userData} /> : <LogoIcon />}
            <div className="flex flex-col gap-2 mt-8">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="flex-shrink-0 rounded-full h-7 w-7"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Routes>
        <Route path="/" element={<EventCreation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<EventCreation />} />
        <Route path="/event/:id" element={<ViewEvent />} />
        <Route path="/create-quiz" element={<QuizCreation />} />
        <Route path="/settings" element={<QuizCreation />} />
        <Route path="/results/:id" element={<AdminResults />} />
        <Route path="/hiring" element={<Dashboard />} />
        <Route path="/hiring/:id" element={<ViewSession />} />
      </Routes>
    </div>
  );
}
export const Logo = ({ userData }: any) => {
  return (
    <Link
      to="/demo"
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
    >
      <div className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black whitespace-pre dark:text-white"
      >
        {userData.ClubName}
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      to="#"
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
    >
      <div className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg dark:bg-white" />
    </Link>
  );
};

const Dashboard = () => {
  // const navigate = useNavigate();
  const [clubMembers, setClubMembers] = useState([]);
  const [displayClubModal, setDisplayClubModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [displaySessionModal, setDisplaySessionModal] = useState(false);
  const [addSessionModal, setAddSessionModal] = useState(false);
  // const handleAddMember = () => {
  //   navigate("/clubAdmin/addMember");
  //   console.log("Add new club member");
  // };

  const { userData } = useAuth();
  useEffect(() => {
    const getClubData = async () => {
      try {
        if (userData != null) {
          await axiosInstance
            .get(`/api/clubs/getClubMembers?ClubID=${userData?.ClubID}`)
            .then((res) => {
              console.log("members");
              console.log(res.data);
              setClubMembers(res.data);
            });
        } else {
          console.log("User data is null");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getClubData();
  }, [userData]);

  return (
    <div className="flex flex-1 flex-col">
      {addMemberModal && (
        <AddClubMembers setAddMemberModal={setAddMemberModal} />
      )}
      {displayClubModal && (
        <ClubMembers
          clubMembers={clubMembers}
          setDisplayClubModal={setDisplayClubModal}
        />
      )}
      <div className="flex flex-col flex-1 w-full h-full gap-2 p-2 bg-[#101524] md:p-10 rounded-tl-2xl border-2xl border-neutral-200 dark:border-neutral-2  00 dark:bg-neutral-900 items-center justify-center  space-y-20">
        {/* Placeholder for skeleton loading */}
        {/* <div className="flex gap-2">
          {[...new Array(4)].map((_, index) => (
            <div
              key={`first-array-${index}`}
              className="w-full h-20 bg-gray-100 rounded-lg dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          {[...new Array(2)].map((_, index) => (
            <div
              key={`second-array-${index}`}
              className="w-full h-full bg-gray-100 rounded-lg dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div> */}

        <button
          onClick={() => {
            setDisplayClubModal(true);
          }}
          className="p-2 bg-cyan-300 text-black rounded-lg hover:bg-cyan-400 transition-colors w-[50em] "
        >
          Display Club Members
        </button>
        <button
          onClick={() => {
            setAddMemberModal(true);
          }}
          className="p-2 bg-cyan-300 text-black rounded-lg hover:bg-cyan-400 transition-colors  w-[50em] border-2xl border-white"
        >
          Add New Club Member
        </button>

        {addSessionModal && (
          <AddHiringSession setAddSessionModal={setAddSessionModal} />
        )}

        {displaySessionModal && (
          <HiringSessions setDisplaySessionModal={setDisplaySessionModal} />
        )}

        <button
          onClick={() => {
            setDisplaySessionModal(true);
          }}
          className="p-2 bg-cyan-300 text-black rounded-lg hover:bg-cyan-400 transition-colors w-[50rem]"
        >
          Display Previous Sessions
        </button>
        <button
          onClick={() => {
            setAddSessionModal(true);
          }}
          className="p-2 bg-cyan-300 text-black rounded-lg hover:bg-cyan-400 transition-colors w-[50rem]"
        >
          Add New Hiring Session
        </button>
      </div>
    </div>
  );
};
const ClubMembers = ({ clubMembers, setDisplayClubModal }: any) => {
  return (
    <div
      style={{
        backgroundImage: `url(${microBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-[90%] md:w-[75%] h-[70%] p-4 absolute z-50 rounded-lg left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-scroll pt-12 flex flex-col gap-4 shadow-lg "
    >
      <p className="font-extrabold text-4xl  text-center text-blue-900">
        Club Members List
      </p>
      <p
        onClick={() => {
          setDisplayClubModal(false);
        }}
        className="absolute top-4 right-4 hover:text-red-600 font-semibold cursor-pointer text-lg transition-colors"
      >
        X
      </p>
      {clubMembers.map((member: any, index: any) => (
        <div
          key={index}
          className="flex flex-col gap-2 p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md transition-transform transform hover:scale-[101%] shadow-md"
        >
          <div className="flex justify-between items-center">
            <img
              src={member.ProfileImageURL}
              alt="profile"
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <div className="flex gap-4">
              <svg
                className="hover:text-red-400 w-6 h-6 transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 hover:text-green-400 transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232a3 3 0 114.243 4.243L7.5 21H3v-4.5L15.232 5.232z"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold">
              {member.FirstName} {member.LastName} -{" "}
              <span className="text-yellow-300">{member.Role}</span>
            </span>
            <span className="text-sm font-normal">{member.Email}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Dashboard;
