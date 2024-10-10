"use client";

const Hero: React.FC = () => {

  return (
    <div className="relative z-10 flex flex-col w-full overflow-hidden text-white bg-background md:shadow-xl">
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
    </div>
  );
};

export default Hero;
