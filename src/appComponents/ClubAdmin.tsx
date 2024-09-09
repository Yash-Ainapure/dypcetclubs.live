"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
// import { Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Events from "./Events";
import QuizCreation from "./QuizCreation";

export function ClubAdmin() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Not logged in");
      navigate("/");
      // return <Redirect to="/" />;
    }
  });

  const links = [
    {
      label: "Dashboard",
      href: "/clubAdmin/dashboard",
      icon: (
        <IconBrandTabler className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Events",
      href: "/clubAdmin/",
      icon: (
        <IconUserBolt className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Quiz-Creation",
      href: "/clubAdmin/create-quiz",
      icon: (
        <IconSettings className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
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
        <Route
          path="/"
          element={
            <div className="bg-black">
              <Events />
            </div>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-quiz" element={<QuizCreation />} />
      </Routes>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
    >
      <div className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black whitespace-pre dark:text-white"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
    >
      <div className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg dark:bg-white" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 w-full h-full gap-2 p-2 bg-slate-500 border md:p-10 rounded-tl-2xl border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first-array" + i}
              className="w-full h-20 bg-gray-100 rounded-lg dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          {[...new Array(2)].map((i) => (
            <div
              key={"second-array" + i}
              className="w-full h-full bg-gray-100 rounded-lg dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
