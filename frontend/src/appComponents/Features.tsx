import React from "react";
import { RiCalendar2Fill, RiStickyNote2Fill } from "react-icons/ri";
import { MdPeople, MdSpeakerPhone } from "react-icons/md";
import Meteors from "@/components/magicui/meteors";

// Define the interface for the feature data structure
interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  gradient: string;
}

// Define the feature data array with proper types
const featureData: Feature[] = [
  {
    icon: <RiStickyNote2Fill size={23} />,
    title: " Club Registration & Management",
    description: "Register and manage club details seamlessly.",
    gradient: "bg-black",
  },
  {
    icon: <RiCalendar2Fill size={23} />,
    title: "Event Organization",
    description:
      "Create, edit, and delete events, complete with images and tags.",
    gradient: "bg-white",
  },
  {
    icon: <MdSpeakerPhone size={23} />,
    title: "Announcement System",
    description: "Post rich-text announcements for your club members.",
    gradient: "bg-black",
  },
  {
    icon: <MdPeople size={23} />,
    title: "Member Management",
    description: "Easily manage members and assign roles.",
    gradient: "bg-white",
  },
];

const Features: React.FC = () => {
  return (
    <section className="bg-gray-700 py-10">
      <div className="container px-5 py-2 mx-auto">
      <div className="relative flex flex-col items-center justify-center w-full py-8 overflow-hidden text-white">
        <div>
          <Meteors number={10} />
          <div className="pt-10 pb-16 text-center">
            <h1 className="pb-4 text-3xl font-bold">What We Offer to Our Users</h1>
            <p className="text-lg text-gray-400">
            A comprehensive platform for managing college clubs, events, and announcements effectively.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -m-4">
          {featureData.map((feature, index) => (
            <div key={index} className="xl:w-1/4 md:w-1/2 p-4">
              <div
                className={`shadow-lg rounded-xl p-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${
                  feature.gradient
                } h-full flex flex-col justify-between ${
                  feature.gradient.includes("white")
                    ? "text-black"
                    : "text-white"
                }`}
              >
                <div>
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-opacity-80 mb-4">
                    {feature.icon}
                  </div>
                  <h2 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h2>
                </div>
                <p className="leading-relaxed mt-4">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default Features;
